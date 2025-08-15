class Admin::V2::MenusController < Admin::BaseController
  def index
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @week_start = @date.beginning_of_week(:sunday)
    @week_end = @week_start + 6.days

    @menus = Menu.includes(:appointment)
                 .where(start_at: @week_start.beginning_of_day..@week_end.end_of_day)
                 .order(start_at: :asc)

    @menus_by_day = @menus.group_by { |menu| menu.start_at.to_date }
  end

  def create
    @menu = Menu.new(menu_params)

    if @menu.save
      flash[:notice] = "予約枠を作成しました (#{@menu.department} #{@menu.start_at.strftime('%Y-%m-%d %H:%M')})"
    else
      flash[:alert] = @menu.errors.full_messages.join(", ")
    end

    redirect_to admin_v2_menus_path(date: @menu.start_at.to_date)
  end

  def destroy
    @menu = Menu.find(params[:id])

    if @menu.appointment.present?
      flash[:alert] = "予約がある枠は削除できません"
    else
      @menu.destroy
      flash[:notice] = "予約枠を削除しました (#{@menu.department} #{@menu.start_at.strftime('%Y-%m-%d %H:%M')})"
    end

    redirect_to admin_v2_menus_path(date: params[:date] || @menu.start_at.to_date)
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = "指定された予約枠が見つかりません"
    redirect_to admin_v2_menus_path(date: params[:date])
  end

  def destroy_all
    min_date = params[:min_date] ? Date.parse(params[:min_date]) : nil
    max_date = params[:max_date] ? Date.parse(params[:max_date]) : nil

    menus = Menu.left_joins(:appointment).where(appointment: { id: nil })
    menus = menus.where(start_at: min_date.beginning_of_day..) if min_date
    menus = menus.where(start_at: ..max_date.end_of_day) if max_date

    count = menus.count
    menus.destroy_all

    flash[:notice] = "#{count}件の予約枠を削除しました"
    redirect_to admin_v2_menus_path(date: params[:date] || min_date)
  end

  private

  def menu_params
    params.require(:menu).permit(:start_at, :department)
  end
end
