require "application_system_test_case"

class MakeAppointmentTest < ApplicationSystemTestCase
  setup do
    (1...7).each do |i|
      CreateDailyAppointmentMenuService.new(Date.today + i.days).execute
    end
  end

  test "makes an appointment for internal medicine when input parameters are valid" do
    visit '/'
    assert_text '診療科を選択'
    click_button '内科'
    assert_text '内科外来予約'
    
    menu_buttons = all('[data-testid=select-menu-button]')
    refute menu_buttons.empty?
    menu_buttons.sample.click
    
    fill_in 'full_name', with: '架橋　太郎'
    fill_in 'full_kana_name', with: 'カケハシ　タロウ'
    fill_in 'birthday', with: '19910523'
    fill_in 'phone-number', with: '0000000000'
    fill_in 'email', with: 'appointment-spec@example.com'
    
    assert has_checked_field?(name: 'whether_first_visit', visible: false)
    find('[value=no]', visible: false).choose
    fill_in 'clinical-number', with: '00043'
    find('[value=糖尿病]', visible: false).check
    fill_in 'free-comment', with: "spec\n1型糖尿病\n2型糖尿病\nリブレ"
    
    appointment_count_before = Appointment.count
    click_button '予約'
    assert_text '予約が成立しました'
    assert_equal appointment_count_before + 1, Appointment.count
  end
end
