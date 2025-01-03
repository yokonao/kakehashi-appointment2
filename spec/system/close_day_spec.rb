require 'rails_helper'

RSpec.describe 'Set a day when the company is closed', type: :system do
  before { ActionController::Base.allow_forgery_protection = true }
  after  { ActionController::Base.allow_forgery_protection = false }

  before do
    (-7...7).each do |i|
      CreateDailyAppointmentMenuService.new(Date.today + i.days).execute
    end
    Administrator.create!(email: "test+admin@example.com", password: 'testtest')
  end

  it 'closes the clinic on Friday', js: true do
    visit '/administrators/sign_in'
    fill_in 'administrator_email', with: 'test+admin@example.com'
    fill_in 'administrator_password', with: 'testtest'
    click_button 'ログイン'
    
    visit '/admin/menus'
    assert_text 'かけはし糖尿病・甲状腺クリニック 管理画面', wait: 3

    page.find('span', text: '（金）').sibling('button').click
    assert_text 'の予約枠を全て削除します', wait: 3
    assert_selector 'button', text: '削除'

    expect do
      click_button '削除'
      assert_text '件の予約枠を削除しました', wait: 3
    end.to change { Menu.count }.by(-13)
  end
end
