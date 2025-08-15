# frozen_string_literal: true

module Administrators
  class SessionsController < Devise::SessionsController
    ADMIN_V2_DEV = ENV.fetch("ADMIN_V2_DEV", false)

    # DELETE /resource/sign_out
    def destroy
      Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    end

    private

    def after_sign_in_path_for(_resource)
      ADMIN_V2_DEV ? "/admin/menus" : "/admin/v2/appointments"
    end
  end
end
