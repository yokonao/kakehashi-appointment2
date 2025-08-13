require 'test_helper'

class AppointmentTest < ActiveSupport::TestCase
  setup do
    @menu = Menu.create!(department: '内科', start_at: '2021-07-21 09:30:00', end_at: '2021-07-21 10:00:00')
  end

  def valid_appointment_attributes
    {
      full_name: '架橋 花子',
      full_kana_name: 'カケハシ ハナコ',
      birthday: '2021-08-01',
      is_first_visit: false,
      clinical_number: '00099',
      email: 'test@example.com',
      phone_number: '0000000000',
      reason: 'MyString',
      free_comment: 'MyText',
      menu_id: @menu.id
    }
  end

  test "is valid using valid appointment attributes" do
    appointment = Appointment.new(valid_appointment_attributes)
    assert appointment.valid?
  end

  test "is valid when appointment has a menu" do
    appointment = Appointment.new(valid_appointment_attributes.merge(menu_id: @menu.id))
    assert appointment.valid?
  end

  test "is invalid when appointment does not have full name" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_name: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:full_name], 'を入力してください'
  end

  test "is invalid when appointment does not have full kana name" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_kana_name: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:full_kana_name], 'を入力してください'
  end

  test "is valid when appointment contains full-width space in full kana name" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_name: 'カケハシ　ハナコ'))
    assert appointment.valid?
  end

  test "is invalid when appointment does not have birthday" do
    appointment = Appointment.new(valid_appointment_attributes.merge(birthday: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:birthday], 'を入力してください'
  end

  test "is invalid when appointment is unclear whether it is the first visit" do
    appointment = Appointment.new(valid_appointment_attributes.merge(is_first_visit: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:is_first_visit], 'は一覧にありません'
  end

  test "is invalid when appointment does not have email" do
    appointment = Appointment.new(valid_appointment_attributes.merge(email: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:email], 'を入力してください'
  end

  test "is invalid when appointment does not have phone number" do
    appointment = Appointment.new(valid_appointment_attributes.merge(phone_number: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:phone_number], 'を入力してください'
  end

  test "is invalid when appointment does not have reason for consultation" do
    appointment = Appointment.new(valid_appointment_attributes.merge(reason: nil))
    assert_not appointment.valid?
    assert_includes appointment.errors[:reason], 'を入力してください'
  end

  test "is valid when appointment does not have free comment" do
    appointment = Appointment.new(valid_appointment_attributes.merge(free_comment: nil))
    appointment.valid?
    assert appointment.valid?
  end

  test "is invalid when appointment has no menu" do
    appointment = Appointment.new(valid_appointment_attributes.merge(menu_id: nil))
    assert_not appointment.valid?
  end

  test "has too long full name" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_name: (0...100).map{ (65 + rand(26)).chr }.join))
    assert_not appointment.valid?
  end

  test "has too long full kana name" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_kana_name: 'longlonglonglonglonglong'))
    assert_not appointment.valid?
  end

  test "has the full kana name contains hiragana character" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_kana_name: 'かけはし はなこ'))
    assert_not appointment.valid?
  end

  test "has the full kana name contains some symbol" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_kana_name: 'カケハシ@+-ハナコ'))
    assert_not appointment.valid?
  end

  test "has the full kana name contains some alphabet" do
    appointment = Appointment.new(valid_appointment_attributes.merge(full_kana_name: 'Kakehashi Hanako'))
    assert_not appointment.valid?
  end

  test "has invalid mail address and is invalid" do
    appointment = Appointment.new(valid_appointment_attributes.merge(email: 'hogehoge'))
    assert_not appointment.valid?
    assert_includes appointment.errors[:email], 'は不正な値です'
  end

  test "has invalid phone number and is invalid" do
    appointment = Appointment.new(valid_appointment_attributes.merge(phone_number: '`+*#$$Q'))
    assert_not appointment.valid?
    assert_includes appointment.errors[:phone_number], 'は不正な値です'
  end
end