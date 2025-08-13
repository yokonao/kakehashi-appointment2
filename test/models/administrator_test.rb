require 'test_helper'

class AdministratorTest < ActiveSupport::TestCase
  test "is invalid when email does not exist" do
    admin = Administrator.new(password: 'password')
    assert_not admin.valid?
  end

  test "is invalid when password does not exist" do
    admin = Administrator.new(email: 'admin@example.com')
    assert_not admin.valid?
  end
  
  test "is invalid when email is blank" do
    admin = Administrator.new(email: '', password: 'password')
    assert_not admin.valid?
  end

  test "is invalid when password is blank" do
    admin = Administrator.new(email: 'admin@example.com', password: '')
    assert_not admin.valid?
  end
end