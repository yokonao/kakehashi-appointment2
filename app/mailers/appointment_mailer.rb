class AppointmentMailer < ApplicationMailer
  def appointment_email
    @appointment = params[:appointment]
    @menu = @appointment.menu
    mail(to: @appointment.email, subject: '予約が成立しました')
  end
end
