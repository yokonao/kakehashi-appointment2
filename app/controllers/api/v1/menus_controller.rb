class Api::V1::MenusController < ApplicationController
  def index
    @menus = Menu.all.order(start_at: :asc)
    render json: @menus
  end
end
