class Api::V1::AppointmentsController < ApplicationController
  def create
    appointment = Appointment.new(appointment_params)
    if appointment.valid?
      appointment.save!
      render json: appointment
    else
      render json: { "errors": appointment.errors.full_messages }
    end
  end

  def appointment_params
    params.require(:appointment).permit(:first_name, :last_name, :first_kana_name, :last_kana_name, :birthday, :is_first_visit,
                                        :clinical_number, :email, :phone_number, :reason, :free_comment, :menu_id)
  end
end
