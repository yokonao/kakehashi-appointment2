# frozen_string_literal: true

class AppointmentMailer < ApplicationMailer
  default from: ENV["CUSTOM_DOMAIN_ADDRESS"]
  def appointment_email
    @appointment = params[:appointment]
    @menu = @appointment.menu
    mail(to: @appointment.email, subject: "予約が成立しました")
  end

  def notification_email
    @appointment = params[:appointment]
    @menu = @appointment.menu
    mail(to: ENV["DOCTOR_ADDRESS"], subject: "WEB予約が一件入りました")
  end

  def deletion_email
    @appointment = params[:appointment]
    @menu = @appointment.menu
    @reason = params[:reason]
    mail(to: ENV["DOCTOR_ADDRESS"], subject: "WEB予約を一件削除しました")
  end
end
