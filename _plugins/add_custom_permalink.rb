# _plugins/add_custom_permalink.rb
require 'time'

Jekyll::Hooks.register :site, :post_read do |site|
  Jekyll.logger.info "Custom Permalink Plugin:", "Starting to process posts..."

  site.posts.docs.each do |post|
    # Log the post being processed
    Jekyll.logger.info "Custom Permalink Plugin:", "Processing post: #{post.path}"

    # Determine the link_category
    link_category = post.data['link_category']
    if link_category
      Jekyll.logger.info "Custom Permalink Plugin:", "Found link_category: #{link_category}"
    elsif post.data['categories'] && post.data['categories'].any?
      link_category = post.data['categories'].first
      Jekyll.logger.info "Custom Permalink Plugin:", "Using first category from categories: #{link_category}"
    else
      Jekyll.logger.info "Custom Permalink Plugin:", "No link_category or categories found for post: #{post.path}"
      next # Skip this post if no link_category or categories are available
    end

    # Extract year and month from the post date
    year = post.date.strftime('%Y')
    month = post.date.strftime('%m')
    slug = post.data['slug'] || post.data['title'].downcase.strip.gsub(" ", "-").gsub(/[^\w-]/, "")

    # Generate the custom permalink
    custom_permalink = "/#{link_category}/#{year}/#{month}/#{slug}/"
    Jekyll.logger.info "Custom Permalink Plugin:", "Generated custom permalink: #{custom_permalink}"

    # Set the custom permalink
    post.data['permalink'] = custom_permalink
  end

  Jekyll.logger.info "Custom Permalink Plugin:", "Finished processing posts."
end