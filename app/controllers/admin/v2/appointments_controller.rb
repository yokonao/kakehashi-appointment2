class Admin::V2::AppointmentsController < Admin::BaseController
  def index
    @appointments = Appointment.includes(:menu).order(created_at: :desc).page(params[:page]).per(20)
  end

  def destroy
    @appointment = Appointment.find(params[:id])
    reason = params[:reason]

    if reason.blank? || reason.length < 5
      flash[:alert] = "削除理由は5文字以上で入力してください"
      redirect_to admin_v2_appointments_path
      return
    end

    AppointmentMailer.with(appointment: @appointment, reason: reason).deletion_email.deliver_later
    @appointment.destroy

    if @appointment.destroyed?
      flash[:notice] = "予約を削除しました"
    else
      flash[:alert] = @appointment.errors.full_messages.join(", ")
    end

    redirect_to admin_v2_appointments_path
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = "指定された予約が見つかりません"
    redirect_to admin_v2_appointments_path
  end
end
