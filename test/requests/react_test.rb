require "test_helper"

class ReactsTest < ActionDispatch::IntegrationTest
  test "GET /form returns 200" do
    get "/form"
    assert_response :ok
  end
end
