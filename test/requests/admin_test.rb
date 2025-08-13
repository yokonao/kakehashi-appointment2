require "test_helper"

class AdminsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "GET /admin/dashboard when not login redirects to login page" do
    get "/admin/dashboard"
    assert_response :redirect
    assert_redirected_to new_administrator_session_url
  end

  test "GET /admin/dashboard when login returns 200" do
    administrator = administrators(:admin_one)
    sign_in administrator

    get "/admin/dashboard"
    assert_response :ok
  end
end
