require "application_system_test_case"

class CloseDayTest < ApplicationSystemTestCase
  setup do
    (-7...7).each do |i|
      CreateDailyAppointmentMenuService.new(Date.today + i.days).execute
    end
    Administrator.create!(email: "test+admin@example.com", password: 'testtest')
  end

  test "closes the clinic on Friday" do
    visit '/administrators/sign_in'
    fill_in 'administrator_email', with: 'test+admin@example.com'
    fill_in 'administrator_password', with: 'testtest'
    click_button 'ログイン'
    
    visit '/admin/menus'
    assert_text 'かけはし糖尿病・甲状腺クリニック 管理画面'

    page.find('span', text: '（金）').sibling('button').click
    assert_text 'の予約枠を全て削除します'
    assert_selector 'button', text: '削除'

    menu_count_before = Menu.count
    click_button '削除'
    assert_text '件の予約枠を削除しました'
    assert_equal menu_count_before - 13, Menu.count
  end
end