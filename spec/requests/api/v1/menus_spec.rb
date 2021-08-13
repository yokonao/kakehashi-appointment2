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
    context 'when the min and maxdate is given' do
      let(:params) { { min_date: '2021-09-06', max_date: '2021-09-06' } }
      it 'returns menus of one day' do
        expect(subject).to have_http_status(:ok)
        # 2021年9月6日は月曜日で午前診療+午後診療で13枠
        expect(json.length).to eq 13
      end
    end
    context 'when all menu is already filled on the day' do
      let(:day) { '2021-09-11' }
      let(:params) { { min_date: day, max_date: day } }
      before do
        Menu.where(start_at: Time.parse(day)...(Time.parse(day) + 1.days)).each do |menu|
          create(:appointment, menu_id: menu.id)
        end
      end
      it 'returns menus filled' do
        expect(subject).to have_http_status(:ok)
        # 2021年9月11日は土曜日で午前診療で6枠
        expect(json.length).to eq 6
        expect(json[0]['filled']).to eq true
      end
    end

    context 'when the date range is given' do
      # 9月6日は月曜、9月8日は水曜
      let(:params) { { min_date: '2021-09-06', max_date: '2021-09-08' } }
      it 'return menus in between the range' do
        expect(subject).to have_http_status(:ok)
        # 一日13枠×3日
        expect(json.length).to eq 39
      end
    end
  end
end
