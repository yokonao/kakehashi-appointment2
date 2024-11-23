source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.3.6'

# Rails 8.0.0 で render に渡す options が frozen になったため active_model_serializers にパッチが必要
# https://github.com/rails/rails/pull/52826
# https://github.com/rails-api/active_model_serializers/pull/2482
gem 'active_model_serializers', git: 'https://github.com/rails-api/active_model_serializers', branch: '0-10-stable'
# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false
gem 'devise'
gem 'pg', '< 2'
gem 'puma', '< 7'
gem 'rails', '8.0.0'
gem 'rails-i18n'
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
end

group :development, :test do
  gem 'debug'
  gem 'factory_bot_rails'
  gem 'forgery_ja'
  gem 'rexml'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end
