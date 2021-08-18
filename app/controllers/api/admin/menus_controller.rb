class Api::Admin::MenusController < ApplicationController
  before_action :authenticate_administrator!

  def index
    @menus = Menu.all.preload(:appointment).order(start_at: :asc)
    render json: @menus, each_serializer: MenuAdminSerializer
  end

  def destroy
    id = params.permit(:id)[:id]
    menu = Menu.find(id)
    menu.destroy
    if menu.errors.empty?
      render json: { "message": '予約枠を削除しました' }
    else
      render json: { "message": menu.errors.full_messages }, status: :bad_request
    end
  end

  def destroy_all
    menus = Menu.all.preload(:appointment)
    min_date = date_params[:min_date]
    max_date = date_params[:max_date]
    menus = menus.where(start_at: Time.parse(min_date).beginning_of_day..) if min_date
    menus = menus.where(start_at: ..Time.parse(max_date).end_of_day) if max_date
    before_count = Menu.count
    menus.destroy_all
    after_count = Menu.count
    render json: { "message": "#{after_count - before_count}件の予約枠を削除しました" }
  end

  def date_params
    params.permit(:min_date, :max_date)
  end
end
