require 'rails_helper'

RSpec.describe 'Api::Admin::Appointments', type: :request do
  describe 'GET /index' do
    let!(:administrator) { create(:administrator) }
    let!(:menu1) { create(:menu) }
    let!(:menu2) { create(:menu_kampo) }
    let!(:appointment1) { create(:appointment, menu_id: menu1.id) }
    let!(:appointment2) { create(:appointment, menu_id: menu2.id) }
    subject do
      get api_admin_appointments_index_path, as: :json
      response
    end
    let(:json) { JSON.parse(response.body) }

    context 'when not logged in' do
      let(:id) { menu.id }
      it 'returns 401' do
        expect(subject).to have_http_status(:unauthorized)
      end
    end

    context 'when logged in' do
      before do
        sign_in administrator
      end
      it 'returns all appointments' do
        expect(subject).to have_http_status(:ok)
        expect(json.length).to eq 2
      end
    end
  end
end
