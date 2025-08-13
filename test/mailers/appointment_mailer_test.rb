require 'test_helper'

class AppointmentMailerTest < ActionMailer::TestCase
  setup do
    @original_custom_domain = ENV['CUSTOM_DOMAIN_ADDRESS']
    @original_doctor_address = ENV['DOCTOR_ADDRESS']
    ENV['CUSTOM_DOMAIN_ADDRESS'] = 'web.appointment@example.com'
    ENV['DOCTOR_ADDRESS'] = 'doctor@example.com'
  end

  teardown do
    ENV['CUSTOM_DOMAIN_ADDRESS'] = @original_custom_domain
    ENV['DOCTOR_ADDRESS'] = @original_doctor_address
  end

  test "raises error when no appointment given" do
    assert_raises(NoMethodError) do
      AppointmentMailer.appointment_email.deliver_now
    end
  end

  test "generates appointment email with correct headers" do
    appointment = appointments(:valid_appointment)
    mail = AppointmentMailer.with(appointment: appointment).appointment_email
    
    assert_equal '予約が成立しました', mail.subject
    assert_includes mail.to, appointment.email
  end

  test "generates notification email with correct headers" do
    appointment = appointments(:valid_appointment)
    mail = AppointmentMailer.with(appointment: appointment).notification_email
    
    assert_equal 'WEB予約が一件入りました', mail.subject
    assert_includes mail.to, 'doctor@example.com'
  end
end
