class Api::V1::MenusController < ApplicationController
  def index
    @menus = Menu.all.order(start_at: :asc)
    @menus = @menus.where(start_at: Time.parse(date_param)..(Time.parse(date_param) + 1.days)) if date_param
    render json: @menus
  end

  def date_param
    params.permit(:date)[:date]
  end
end
