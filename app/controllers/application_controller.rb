# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def show
    @disable_propshaft = true
  end
end
