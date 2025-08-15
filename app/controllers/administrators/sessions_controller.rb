# frozen_string_literal: true

module Administrators
  class SessionsController < Devise::SessionsController
    private

    def after_sign_in_path_for(_resource)
      "/admin/v2/appointments"
    end

    def after_sign_out_path_for(_resource)
      new_administrator_session_path
    end
  end
end
