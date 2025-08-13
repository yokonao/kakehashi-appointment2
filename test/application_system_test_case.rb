require "test_helper"
require "capybara/rails"
require "capybara/minitest"
require "selenium/webdriver"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400] do |driver_options|
    if ENV.fetch('SELENIUM_CHROME_HEADFULL', false)
      driver_options.args.delete('--headless')
    end
  end

  include Capybara::Minitest::Assertions

  def setup
    super
    ActionController::Base.allow_forgery_protection = true
  end

  def teardown
    ActionController::Base.allow_forgery_protection = false
    super
  end
end