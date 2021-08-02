require 'rails_helper'

RSpec.describe 'Api::V1::Menus', type: :request do
  let(:base_day) { Date.parse('2021-09-05') }
  describe 'GET /index' do
    before do
      (1...7).each do |i|
        CreateDailyAppointmentMenuService.new(base_day + i.days).execute
      end
    end
    subject do
      get api_v1_menus_index_path, as: :json, params: params
      response
    end
    let(:json) { JSON.parse(response.body) }
    context 'when no prameter is given' do
      let(:params) { nil }
      it 'returns all menu' do
        expect(subject).to have_http_status(:ok)
        expect(json.length).to eq 62
      end
    end
    context 'when the date is given' do
      let(:params) { { date: '2021-09-06' } }
      it 'returns menus of one day' do
        expect(subject).to have_http_status(:ok)
        # 2021年9月6日は月曜日で午前診療+午後診療で13枠
        expect(json.length).to eq 13
      end
    end
  end
end
