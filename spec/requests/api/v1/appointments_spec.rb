require 'rails_helper'

RSpec.describe 'Api::V1::Appointments', type: :request do
  describe 'POST /create' do
    let!(:menu) { create(:menu) }
    let!(:valid_params) do
      { full_name: '架橋 花子',
        full_kana_name: 'カケハシ ハナコ',
        birthday: '1990-01-01',
        is_first_visit: false,
        clinical_number: '00001',
        email: 'test@example.com',
        phone_number: '0000000000',
        reason: '糖尿病,脂質異常症',
        free_comment: 'MyText',
        menu_id: menu.id }
    end
    subject do
      post api_v1_appointments_create_path, as: :json, params: { appointment: params }
      response
    end
    let(:json) { JSON.parse(response.body) }
    context 'when no parameter is given' do
      let(:params) { nil }
      it 'raise ActionoController::ParameterMissing error' do
        expect { subject }.to raise_error(ActionController::ParameterMissing)
      end
    end
    context 'when valid parameters arg given' do
      let(:params) { valid_params }
      it 'can create an appointment' do
        expect(subject).to have_http_status(:ok)
        expect(Appointment.count).to eq 1
      end
    end
    context 'when the menu is not specified' do
      let(:params) { valid_params.except(:menu_id) }
      it 'returns an error' do
        expect(subject).to have_http_status(:ok)
        expect(Appointment.count).to eq 0
        expect(json['errors']['menu']).to include '予約枠を入力してください'
      end
    end
    context 'when the specified menu does not exist' do
      let(:params) { valid_params.merge!({ menu_id: -1 }) }
      it 'returns an error' do
        expect(subject).to have_http_status(:ok)
        expect(Appointment.count).to eq 0
        expect(json['errors']['menu']).to include '予約枠を入力してください'
      end
    end
    context 'when the specified menu is already filled' do
      before do
        create(:appointment, menu_id: menu.id)
      end
      let(:params) { valid_params }
      it 'returns an error' do
        expect(subject).to have_http_status(:ok)
        expect(Appointment.count).to eq 1
        expect(json['errors']['menu']).to include '予約枠が一杯です。別の日時を選択してください'
      end
    end
  end
end
