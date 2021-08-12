class AppointmentMailer < ApplicationMailer
  default from: ENV['CUSTOM_DOMAIN_ADDRESS']
  def appointment_email
    @appointment = params[:appointment]
    @menu = @appointment.menu
    mail(to: @appointment.email, subject: '予約が成立しました')
  end
end
