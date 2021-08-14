class Api::Admin::AppointmentsController < ApplicationController
  before_action :authenticate_administrator!

  def index
    @appointments = Appointment.all.order(id: :desc)
    render json: @appointments
  end

  def destroy
    id = params.permit(:id)[:id]
    Appointment.find(id).destroy
    render json: { "message": '予約を削除しました' }
  end
end
