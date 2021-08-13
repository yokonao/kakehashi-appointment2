class Api::Admin::MenusController < ApplicationController
  before_action :authenticate_administrator!

  def index
    @menus = Menu.all.order(start_at: :asc)
    render json: @menus
  end

  def destroy
    id = params.permit(:id)[:id]
    Menu.find(id).destroy
    render json: { "message": '予約枠を削除しました' }
  end

  def destroy_all
    Menu.all.destroy_all
    render json: { "message": '予約枠を削除しました' }
  end
end
