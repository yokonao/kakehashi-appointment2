require 'rails_helper'

RSpec.describe "Admins", type: :request do
  describe "GET /admin/dashboard" do
    it 'redirects to login page' do
      get '/admin/dashboard'
      expect(response.status).to eq 302
      expect(response).to redirect_to new_administrator_session_url
    end
  end
end
