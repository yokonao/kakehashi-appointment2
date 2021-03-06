class Api::V1::AppointmentsController < ApplicationController
  def create
    appointment = Appointment.new(appointment_params)
    if appointment.valid?
      appointment.save!
      AppointmentMailer.with(appointment: appointment).appointment_email.deliver_later
      AppointmentMailer.with(appointment: appointment).notification_email.deliver_later
      render json: appointment
    else
      render json: { "errors": appointment.errors.as_json(full_messages: true) }
    end
  end

  def appointment_params
    params.require(:appointment).permit(:full_name, :full_kana_name, :birthday, :is_first_visit, :clinical_number,
                                        :email, :phone_number, :reason, :free_comment, :menu_id)
  end
end
