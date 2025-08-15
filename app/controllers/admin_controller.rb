# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :authenticate_administrator!

  def show
    @disable_propshaft = true
  end
end
