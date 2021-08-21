class Api::Admin::AppointmentsController < ApplicationController
  before_action :authenticate_administrator!

  def index
    @appointments = Appointment.all.eager_load(:menu).order(id: :desc)
    render json: @appointments, each_serializer: AppointmentAdminSerializer
  end

  def destroy
    id = params.permit(:id)[:id]
    appointment = Appointment.find(id)
    appointment.destroy
    if appointment.errors.empty?
      render json: { "message": '予約枠を削除しました' }
    else
      render json: { "message": appointment.errors.full_messages }, status: :bad_request
    end
  rescue ActiveRecord::RecordNotFound
    render json: { "message": '指定された予約が存在しません' }, status: :bad_request
  end
end
