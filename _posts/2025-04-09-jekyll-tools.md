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

A few things had been bugging me:

* Posts were sorted by date but not time, so posts on the same day were sorted alphabetically instead of chronologically.
* My permalinks were overly simplistic. All posts used the format `/journal/title-slug`. While unique titles avoided namespace issues, as I added categories and date-based index pages, I wanted the URLs to reflect some of that data.
* Jekyll's method of including categories in permalinks adds *all* categories like `/category1/category2`. I would like to only show a "main" category in the url.

I solved these issues with a combination of plugins to handle things dynamically at build time and scripts to bake some data into the posts.

### Sorting

Jekyll sorts posts by date from the filename. If you have a [properly formatted](https://en.wikipedia.org/wiki/ISO_8601) `datetime` value in your posts' front matter, you can sort by date + time. I don't. I use a simple `time` value in 12-hour format because I’m lazy and don’t want to think about date formats.

I solved this with a custom plugin to calculate an ISO 8601 datetime value at build time from the `filename date` and post `time`.

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

With the `datetime` value added, sorting posts by date + time is as easy as:

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

For paginated pages, I used the `jekyll-pagination-v2` plugin, which supports sorting.

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

Now posts are sorted by date + time on the main index and paginated `/journal` pages. Yay!

### Updating Permalinks

Before updating permalinks, I ensured existing links would still work. The [`jekyll-redirect-plugin`](https://github.com/jekyll/jekyll-redirect-from) maps old permalinks to new ones.

> Redirects are performed by serving an HTML file with an HTTP-REFRESH meta tag pointing to your destination. No .htaccess file, nginx conf, xml file, or anything else is generated. It simply creates HTML files.

Not as great as a proper 301 or 302, but fine for my needs.

After installing the plugin, I added this to `_config.yml` to avoid generating a `redirects.json` that I don't need:

```yaml
redirect_from:
  json: false
```

Since all existing posts needed redirects, I used a Python script to write the old permalink into each post's front matter.

See [`add_redirects.py`](https://github.com/cjmartin/jekyll-tools/blob/main/add_redirects.py) and its [README section](https://github.com/cjmartin/jekyll-tools/blob/main/README.md#add_redirectspy).

Once redirects were set up, I updated the default post permalink in `_config.yaml`:

```yaml
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      permalink: /journal/:year/:month/:slug/
```

Now posts have permalinks with year and month, which will be useful for future index pages. Old `/journal/:title` links redirect nicely. Huzzah.

### Single Category Permalinks

Jekyll supports `:categories` in permalinks, but I dislike how it handles posts in multiple categories. For example, this post is in both `tools` and `field-notes`. It will appear on `/tools` and `/field-notes` category pages.

Using `/:categories/:year/:month/:slug/` would result in `/tools/field-notes/2025/04/jekyll-tools`. I dislike this because `/tools/field-notes` will never be a valid category URL.

I prefer specifying a `link_category` in the post front matter to specify the primary category in the permalink.

```yaml
categories:
  - tools
  - field-notes
link_category: tools
```

So the post permalink becomes `/tools/2025/04/jekyll-tools`.

Jekyll doesn't support custom front matter variables in permalinks, so I created a plugin to set a permalink for posts with `link_category` or `categories`.

* If `link_category` is set, it is used as the primary category in the permalink.
* If `link_category` is not set but the post has `categories`, the first category is used.

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

Now posts with categories have permalinks including one primary category instead of the default `/journal`. Hooray!

I also added a script to set `link_category` for all posts with existing categories. See [`set_link_category.py`](https://github.com/cjmartin/jekyll-tools/blob/main/set_link_category.py) and its [README section](https://github.com/cjmartin/jekyll-tools/blob/main/README.md#set_link_categorypy).

This script scans posts and sets the first category as `link_category` in their front matter. While the plugin fallback handles this, the script ensures permalinks won't break if I add categories to old posts.

Now I have sorted posts with permalinks that will work well with future index pages. Not bad for a morning of not getting my taxes done!

