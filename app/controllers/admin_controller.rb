class AdminController < ApplicationController
  before_action :authenticate_administrator!
end
