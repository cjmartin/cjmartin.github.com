source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 4.2"

# Plugins specified in _config.yml
group :jekyll_plugins do
  gem "jekyll-paginate-v2"
  gem "jekyll-feed", github: "jekyll/jekyll-feed"
  gem "jekyll-redirect-from"
end

# Needed for deployment via GitHub Actions
gem "webrick", "~> 1.7"  # Required for Ruby 3+