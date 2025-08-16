class AppointmentsController < ApplicationController
  def new
    @week_offset = params[:week_offset].to_i
    @week_offset = 0 if @week_offset < 0  # 負の値は0にリセット
    @week_offset = 3 if @week_offset > 3  # 最大3週間先まで

    @base_date = Date.today + (@week_offset * 7)
    load_available_menus
  end

  def create
    begin
      @menu = Menu.find(params[:menu_id])
    rescue ActiveRecord::RecordNotFound
      flash[:alert] = "予約時間を選択してください"
      redirect_to new_appointment_path and return
    end

    # 予約を作成
    @appointment = Appointment.new(
      menu: @menu,
      full_name: params[:full_name],
      full_kana_name: params[:full_kana_name],
      birthday: Date.strptime(params[:birthday], "%Y%m%d"),
      is_first_visit: params[:is_first_visit] == "true",
      clinical_number: params[:clinical_number],
      email: params[:email],
      phone_number: params[:phone_number],
      reason: params[:consultation_reason],
      free_comment: params[:free_comment],
    )

    if @appointment.save
      # メール送信
      AppointmentMailer.with(appointment: @appointment).appointment_email.deliver_later
      AppointmentMailer.with(appointment: @appointment).notification_email.deliver_later
      redirect_to appointment_complete_path(appointment_id: @appointment.id)
    else
      flash[:alert] = "予約の作成に失敗しました。" + @appointment.errors.full_messages.join(", ")
      redirect_to new_appointment_path
    end
  end

  def complete
    @appointment = Appointment.find(params[:appointment_id])
  end

  private

  def load_available_menus
    # 次の30日間のメニューを取得
    @menus = Menu.where("start_at >= ? AND start_at <= ?", Date.today, Date.today + 30.days)
                 .order(:start_at)
                 .includes(:appointment)

    # 日付ごとにグループ化
    @menus_by_date = @menus.group_by { |menu| menu.start_at.to_date }
  end
end
