class Api::Admin::AppointmentsController < ApplicationController
  before_action :authenticate_administrator!

  def index
    @appointments = Appointment.all.eager_load(:menu).order(id: :desc)
    render json: @appointments, each_serializer: AppointmentAdminSerializer
  end

  def destroy
    reason = params.permit(:reason)[:reason]
    unless reason
      render json: { "message": '削除理由を入力してください' }, status: :bad_request
      return
    end
    id = params.permit(:id)[:id]
    appointment = Appointment.find(id)
    AppointmentMailer.with(appointment: appointment, reason: reason).deletion_email.deliver_later
    appointment.destroy
    if appointment.errors.empty?
      render json: { "message": '予約を削除しました' }
    else
      render json: { "message": appointment.errors.full_messages }, status: :bad_request
    end
  rescue ActiveRecord::RecordNotFound
    render json: { "message": '指定された予約が存在しません' }, status: :bad_request
  end
end
