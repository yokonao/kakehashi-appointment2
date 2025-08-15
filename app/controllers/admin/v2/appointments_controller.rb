class Admin::V2::AppointmentsController < Admin::BaseController
  def index
    @appointments = Appointment.includes(:menu).order(created_at: :desc)
  end
end
