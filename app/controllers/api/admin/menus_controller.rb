class Api::Admin::MenusController < ApplicationController
  before_action :authenticate_administrator!

  def index
    @menus = Menu.all.order(start_at: :asc)
    render json: @menus
  end
end
