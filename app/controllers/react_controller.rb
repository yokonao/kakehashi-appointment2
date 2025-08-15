# frozen_string_literal: true

class ReactController < ApplicationController
  def show
    @disable_propshaft = true
  end
end
