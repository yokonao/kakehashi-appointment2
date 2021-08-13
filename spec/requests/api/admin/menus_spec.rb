require 'rails_helper'

RSpec.describe 'Api::Admin::Menus', type: :request do
  describe 'GET /index' do
    let(:base_day) { Date.parse('2021-09-05') }
    let(:administrator) { create(:administrator) }

    before do
      (1...7).each do |i|
        CreateDailyAppointmentMenuService.new(base_day + i.days).execute
      end
    end
    subject do
      get api_admin_menus_index_path, as: :json, params: params
      response
    end
    let(:json) { JSON.parse(response.body) }
    context 'when not logged in' do
      let(:params) { nil }
      it 'returns 401' do
        expect(subject).to have_http_status(:unauthorized)
      end
    end
    context 'when logged in' do
      before do
        sign_in administrator
      end
      context 'when no prameter is given' do
        let(:params) { nil }
        it 'returns all menu' do
          expect(subject).to have_http_status(:ok)
          expect(json.length).to eq 62
        end
      end
    end
  end
end
