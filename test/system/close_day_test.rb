require "application_system_test_case"

class CloseDayTest < ApplicationSystemTestCase
  setup do
    (-7...7).each do |i|
      CreateDailyAppointmentMenuService.new(Date.today + i.days).execute
    end
    Administrator.create!(email: "test+admin@example.com", password: "testtest")
  end

  test "closes the clinic on Friday" do
    visit "/administrators/sign_in"
    fill_in "administrator_email", with: "test+admin@example.com"
    fill_in "administrator_password", with: "testtest"
    click_button "ログイン"

    visit "/admin/v2/menus"
    assert_text "かけはし糖尿病・甲状腺クリニック 管理画面"

    menu_count_before = Menu.count

    this_friday = Date.current.end_of_week - 2.day
    button = page.find("button[data-test-id='delete-all-button-#{this_friday}']")
    accept_confirm "#{this_friday}の予約のない枠をすべて削除しますか？" do
      button.click
    end

    assert_text "件の予約枠を削除しました"
    assert_equal menu_count_before - 13, Menu.count
  end
end
