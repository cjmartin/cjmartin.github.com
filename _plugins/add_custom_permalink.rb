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