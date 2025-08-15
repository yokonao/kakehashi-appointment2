source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.4.5"

gem "active_model_serializers"
# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false
gem "devise"
gem "kaminari"
gem "pg"
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"
gem "puma"
gem "rails", "8.0.2"
gem "rails-i18n"
gem "tailwindcss-rails"
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [ :windows, :jruby ]

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara"
  gem "selenium-webdriver"
end

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false
end
