class Api::V1::MenusController < ApplicationController
  def index
    @menus = Menu.all.preload(:appointment).order(start_at: :asc)
    min_date = date_params[:min_date]
    max_date = date_params[:max_date]
    @menus = @menus.where(start_at: Time.parse(min_date)..) if min_date
    @menus = @menus.where(start_at: ..Time.parse(max_date).end_of_day) if max_date
    render json: @menus, each_serializer: MenuSerializer
  end

  def date_params
    params.permit(:min_date, :max_date)
  end
end
