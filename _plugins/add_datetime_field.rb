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
