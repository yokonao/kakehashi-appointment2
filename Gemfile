source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.4.5'

gem 'active_model_serializers'
# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false
gem 'devise'
gem 'pg'
gem 'puma'
gem 'rails', '8.0.2'
gem 'rails-i18n'
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:windows, :jruby]

group :development do
  # NOTE: この gem を外すと開発環境のサーバー起動時に以下のようなエラーが発生する
  # listen is not part of the bundle. Add it to your Gemfile. (Gem::LoadError)
  #
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'listen'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara'
  gem 'selenium-webdriver'
end

group :development, :test do
  gem 'debug'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
end
