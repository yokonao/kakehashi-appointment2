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
    Menu.all.destroy_all
    render json: { "message": '予約枠を削除しました' }
  end
end
