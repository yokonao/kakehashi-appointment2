require "test_helper"

class AppointmentMailerTest < ActionMailer::TestCase
  setup do
    @original_custom_domain = ENV["CUSTOM_DOMAIN_ADDRESS"]
    @original_doctor_address = ENV["DOCTOR_ADDRESS"]
    ENV["CUSTOM_DOMAIN_ADDRESS"] = "web.appointment@example.com"
    ENV["DOCTOR_ADDRESS"] = "doctor@example.com"

    @menu = menus(:menu_one)
    @appointment = Appointment.create!({
      full_name: "架橋 花子",
      full_kana_name: "カケハシ ハナコ",
      birthday: "1990-01-01",
      is_first_visit: false,
      clinical_number: "00001",
      email: "test@example.com",
      phone_number: "0000000000",
      reason: "糖尿病,脂質異常症",
      free_comment: "MyText",
      menu: @menu
    })
  end

  teardown do
    ENV["CUSTOM_DOMAIN_ADDRESS"] = @original_custom_domain
    ENV["DOCTOR_ADDRESS"] = @original_doctor_address
  end

  test "raises error when no appointment given" do
    assert_raises(NoMethodError) do
      AppointmentMailer.appointment_email.deliver_now
    end
  end

  test "generates appointment email with correct headers" do
    mail = AppointmentMailer.with(appointment: @appointment).appointment_email

    assert_equal "予約が成立しました", mail.subject
    assert_includes mail.to, @appointment.email
  end

  test "generates notification email with correct headers" do
    mail = AppointmentMailer.with(appointment: @appointment).notification_email

    assert_equal "WEB予約が一件入りました", mail.subject
    assert_includes mail.to, "doctor@example.com"
  end
end
