require 'rails_helper'

RSpec.describe Appointment, type: :system do
  before { ActionController::Base.allow_forgery_protection = true }
  after  { ActionController::Base.allow_forgery_protection = false }

  before do
    (1...7).each do |i|
      CreateDailyAppointmentMenuService.new(Date.today + i.days).execute
    end
  end

  context 'when input parameters is valid' do
    it 'makes an appointment for internal medicine', js: true do
      visit '/'
      expect(page).to have_text('診療科を選択')
      click_button '内科'
      expect(page).to have_text('内科外来予約')
      menu_buttons = all('[data-testid=select-menu-button]')
      expect(menu_buttons.empty?).to be false
      menu_buttons.sample.click
      fill_in 'full_name', with: '架橋　太郎'
      fill_in 'full_kana_name', with: 'カケハシ　タロウ'
      fill_in 'birthday', with: '19910523'
      fill_in 'phone-number', with: '0000000000'
      fill_in 'email', with: 'appointment-spec@example.com'
      expect(page).to have_checked_field with: 'yes', visible: false
      find('[value=no]', visible: false).choose
      fill_in 'clinical-number', with: '00043'
      find('[value=糖尿病]', visible: false).check
      fill_in 'free-comment', with: "spec\n1型糖尿病\n2型糖尿病\nリブレ"
      expect do
        click_button '予約'
        assert_text '予約が成立しました', wait: 3
      end.to change { Appointment.count }.by(1)
    end
  end
end
