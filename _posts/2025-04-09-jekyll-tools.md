---
layout: post
title: "Tools: Jekyll Tools"
place: Truckee, CA
time: 1:30 PM
categories: ['tools', 'field-notes']
tags: ['jekyll', 'development', 'tools']
---

{% include link.html link="https://github.com/cjmartin/jekyll-tools" link_text='Jekyll Tools repo on GitHub' %}

My to-do list for this morning says "Work on Taxes." Instead, I'm writing tools to make updates here.

A few things had been bugging me since I've started posting more:

* Posts were being sorted by date but not time, so any posts on the same day would be sorted alphabetically rather than chronologically.
* My permalinks were overly simplistic. All posts were simply `/journal/title-slug`. I don't think there would ever be a namespace issue there; I can pretty easily give every post a unique title. But as I add categories, date-based index pages, etc., it would be nice for the post URLs to reflect some of that data.
* Jekyll's built-in method of including categories in permalinks adds *all* categories like `/category1/category2`. I don't like this; I'd like to set a `link_category` for only the post's main category to be included in the URL.

These issues could be solved by a variety of methods, but I came up with a combination of plugins to do things dynamically at build time, and scripts to generate and bake some data into the posts themselves.

### Sorting

Jekyll sorts posts by date from the filename. If you have a [properly formatted](https://en.wikipedia.org/wiki/ISO_8601) `datetime` value in your posts' front matter, you can pretty easily use it to sort by date + time, but I don't. I have a simple `time` value that I set to 12-hour time wherever I am because I'm lazy and don't want to think about date formats.

This one I solved with a quick custom plugin to calculate an ISO 8601 datetime value at build time from the `filename date` and post `time`.

```ruby
# _plugins/add_datetime_field.rb
require 'time'

Jekyll::Hooks.register :site, :post_read do |site|
  site.posts.docs.each do |post|
    if post.data['time']
      post_date = post.date.strftime('%Y-%m-%d')
      post_time = post.data['time']

      begin
        time_obj = Time.parse(post_time)
        combined = Time.parse("#{post_date} #{time_obj.strftime('%H:%M')}")
        post.data['datetime'] = combined.iso8601
      rescue ArgumentError => e
        Jekyll.logger.warn "Datetime Plugin:", "Could not parse time '#{post_time}' in #{post.path}: #{e.message}"
      end
    end
  end
end
```

With that `datetime` value added to each post sorting posts by date + time is as easy as:

{% raw %}
```liquid
{% assign sorted_posts = site.posts | sort: "datetime" | reverse %}
{% for post in sorted_posts limit:10 %}
  <div class="post">
    <h1 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h1>
    <p class="meta">{{ post.date | date_to_string }}{% if post.place %} &#8212; {{ post.place }}{% endif %}</p>
    <div class="post-content text">
      {{ post.content }}
    </div>
  </div>
{% endfor %}
```
{% endraw %}

In paginated pages, it's necessary to use the `jekyll-pagination-v2` plugin which supports sorting.

The v2 plugin is drop-in compatible with `jekyll-pagination`, all I had to do was update my `_config.yml` from:

```yaml
paginate: 10
paginate_path: /journal/page:num/
```

To ↓

```yaml
pagination:
  enabled: true
  per_page: 10
  permalink: /page:num/
  sort_field: datetime
  sort_reverse: true
```

My posts are now sorted by date + time on my main index page and paginated `/journal` page. Yay!

### Updating Permalinks

Before I could update my permalinks, I needed to make sure that any existing links would continue working. The [`jekyll-redirect-plugin`](https://github.com/jekyll/jekyll-redirect-from) is the most straightforward way to map the old permalinks to the new ones.

> Redirects are performed by serving an HTML file with an HTTP-REFRESH meta tag which points to your destination. No .htaccess file, nginx conf, xml file, or anything else will be generated. It simply creates HTML files.

Not as great as a proper 301 or 302, but perfectly fine for my needs.

After installing the plugin, I added this to my `_config.yml` so that it doesn't generate a `redirects.json` in the built site that I won't use.

```yaml
redirect_from:
  json: false
```

Since I knew that all existing posts needed redirects, and new posts going forward don't, I used a python script to write the old permalink into each post's front matter.

See [`add_redirects.py`](https://github.com/cjmartin/jekyll-tools/blob/main/add_redirects.py) and its [section in the README](https://github.com/cjmartin/jekyll-tools/blob/main/README.md#add_redirectspy) on GitHub.

Once redirects for the old permalinks were set up, I updated my default post permalink in `_config.yaml`:

```yaml
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      permalink: /journal/:year/:month/:slug/
```

Now my posts all had permalinks including the year and month, which will be nice when I add year and month index pages later, and the old `/journal/:title` links redirect nicely. Huzzah.

### Single Category Permalinks

Jekyll supports `:categories` in permalinks out of the box, but I don't like how it handles posts that are in multiple categories. For example, this post is in both the `tools` and `field-notes` categories, since it's about tools and it has this overview of why I built the tools. Eventually it will show up on the main `/journal`, but also on `/tools` and `/field-notes` category pages.

If I used `/:categories/:year/:month/:slug/` the post permalink would be `/tools/field-notes/2025/04/jekyll-tools`. I don't like this because `/tools/field-notes` will never be a valid category url.

I would prefer to specify a `link_category` value in the post front matter that specifies which category should be used in the permalink. This can be considered the post's "primary category" even though it's also included in others.

```yaml
categories:
  - tools
  - field-notes
link_category: tools
```

So the post would have a permalink of `/tools/2025/04/jekyll-tools`.

Of course this isn't so simple. Jekyll doesn't support custom front matter variables in permalinks.

I solved this with another small custom plugin to set a permalink on any posts that have the `link_category` or `collections` variables set.

* If `link_category` is set, it is used as the primary category in the permalink.
* If `link_category` is not set but the post has `categories`, the first category is used in the permalink.

I like the specificity of setting `link_category` and not worrying about the order of `categories`, but the fallback seemed like a good idea.

```ruby
# _plugins/add_custom_permalink.rb
require 'time'

Jekyll::Hooks.register :site, :post_read do |site|
  site.posts.docs.each do |post|
    # Determine the link_category
    link_category = post.data['link_category']
    if !link_category && post.data['categories'] && post.data['categories'].any?
      link_category = post.data['categories'].first
    end

    # Skip this post if no link_category or categories are available
    next unless link_category

    # Extract year and month from the post date
    year = post.date.strftime('%Y')
    month = post.date.strftime('%m')
    slug = post.data['slug'] || post.data['title'].downcase.strip.gsub(" ", "-").gsub(/[^\w-]/, "")

    # Generate the custom permalink
    custom_permalink = "/#{link_category}/#{year}/#{month}/#{slug}/"

    # Set the custom permalink
    post.data['permalink'] = custom_permalink
  end
end
```

Now any post with categories has a permalink including one primary category instead of the default `/journal`. Hooray!

The second tool that I've added to the [Jekyll tools repo](https://github.com/cjmartin/jekyll-tools/tree/main) isn't necessary for everything above to work, but I wanted to add a `link_category` to all of my posts with existing categories so I threw together a script to do that too.

See [`set_link_category.py`](https://github.com/cjmartin/jekyll-tools/blob/main/set_link_category.py) and its [section in the README](https://github.com/cjmartin/jekyll-tools/blob/main/README.md#set_link_categorypy) on GitHub.

This script scans existing posts and sets the first category as `link_category` in their front matter. This was just a nice to have and would have been handled by the fallback in the plugin above, but now I don't have to worry about breaking a permalink if I go and add a category to one of those old posts and forget about the importance of the order.

Now I have nicely sorted posts with permalinks that will play nicely with index pages I plan to add later. Not a bad result for a morning of not getting my taxes done!

