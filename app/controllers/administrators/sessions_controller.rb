# frozen_string_literal: true

module Administrators
  class SessionsController < Devise::SessionsController
    ADMIN_V2_DEV = ENV.fetch("ADMIN_V2_DEV", false)

    private

    def after_sign_in_path_for(_resource)
      ADMIN_V2_DEV ? "/admin/v2/appointments" : "/admin/menus"
    end

    def after_sign_out_path_for(_resource)
      new_administrator_session_path
    end
  end
end
