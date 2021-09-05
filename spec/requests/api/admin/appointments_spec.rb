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

      it 'contains start time' do
        expect(subject).to have_http_status(:ok)
        expect(json[0]['id']).to eq appointment2.id
        expect(Time.parse(json[0]['start_at'])).to eq menu2.start_at
      end
    end
  end

  describe 'DELETE /:id' do
    let!(:administrator) { create(:administrator) }
    let!(:menu1) { create(:menu) }
    let!(:menu2) { create(:menu_kampo) }
    let!(:appointment1) { create(:appointment, menu_id: menu1.id) }
    let!(:appointment2) { create(:appointment, menu_id: menu2.id) }
    subject do
      delete api_admin_appointment_destroy_path(id), as: :json, params: { reason: reason }
      response
    end
    let(:json) { JSON.parse(response.body) }

    context 'when not logged in' do
      let(:id) { appointment1.id }
      let(:reason) { '時間変更のため' }
      it 'returns 401' do
        expect(subject).to have_http_status(:unauthorized)
      end
    end

    context 'when logged in' do
      let(:id) { appointment1.id }
      let(:reason) { '時間変更のため' }
      before do
        sign_in administrator
      end
      it 'deletes the appointment' do
        expect { subject }.to change { Appointment.count }.by(-1)
        expect(subject).to have_http_status(:ok)
      end

      context 'when specfied id does not exist' do
        let(:id) { -1 }
        let(:reason) { '時間変更のため' }
        it 'return 400' do
          expect(subject).to have_http_status(:bad_request)
        end
      end

      context 'when not specified a reason for deletion' do
        let(:id) { appointment1.id }
        let(:reason) { nil }
        it 'return 400' do
          expect(subject).to have_http_status(:bad_request)
          expect(json['message']).to eq '削除理由を入力してください'
        end
      end
    end
  end
end
