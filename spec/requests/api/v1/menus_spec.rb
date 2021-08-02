require 'rails_helper'

RSpec.describe 'Api::V1::Menus', type: :request do
  let(:base_day) { Date.parse('2021-09-05') }
  describe 'GET /index' do
    before do
      (1...10).each do |i|
        CreateDailyAppointmentMenuService.new(base_day + i.days).execute
      end
    end
    subject do
      get api_v1_menus_index_path, as: :json
      response
    end
    let(:json) { JSON.parse(response.body) }
    it 'returns all menu' do
      expect(subject).to have_http_status(:ok)
      expect(json.length).to eq 88
    end
  end
end
