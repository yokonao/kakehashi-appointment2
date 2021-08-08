require 'rails_helper'

RSpec.describe 'Api::V1::Appointments', type: :request do
  describe 'POST /new' do
    subject do
      post api_v1_appointments_new_path, as: :json
      response
    end
    let(:json) { JSON.parse(response.body) }
    context 'when no prameter is given' do
      let(:params) { nil }
      it 'returns all menu' do
        expect(subject).to have_http_status(:ok)
      end
    end
  end
end
