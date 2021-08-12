require 'rails_helper'

RSpec.describe 'Admins', type: :request do
  describe 'GET /admin/dashboard' do
    context 'when not login' do
      it 'redirects to login page' do
        get '/admin/dashboard'
        expect(response.status).to eq 302
        expect(response).to redirect_to new_administrator_session_url
      end
    end

    context 'when login' do
      let(:administrator) { create(:administrator) }
      before do
        sign_in administrator
      end
      it 'return 200' do
        get '/admin/dashboard'
        expect(response).to have_http_status :ok
      end
    end
  end
end
