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

      context 'when all menu is already filled on the day' do
        # let(:day) { '2021-09-11' }
        let(:params) { nil }
        before do
          Menu.all.each do |menu|
            create(:appointment, menu_id: menu.id)
          end
        end
        it 'contains appointment id' do
          expect(subject).to have_http_status(:ok)
          ## 2021年9月11日は土曜日で午前診療で6枠
          expect(json.length).to eq 62
          expect(json[0]['appointment_id']).not_to eq nil
        end
      end
    end
  end

  describe 'POST /menus/create' do
    let(:administrator) { create(:administrator) }
    let!(:valid_params) do
      {
        start_at: '2021-07-21 09:00:00',
        department: '内科'
      }
    end
    subject do
      post api_admin_menus_create_path, as: :json, params: { menu: params }
      response
    end
    let(:json) { JSON.parse(response.body) }
    context 'when not logged in' do
      let(:params) { valid_params }
      it 'returns 401' do
        expect(subject).to have_http_status(:unauthorized)
      end
    end
    context 'when logged in' do
      before do
        sign_in administrator
      end
      context 'when no parameter is given' do
        let(:params) { nil }
        it 'raise ActionoController::ParameterMissing error' do
          expect { subject }.to raise_error(ActionController::ParameterMissing)
        end
      end
      context 'when valid parameters arg given' do
        let(:params) { valid_params }
        it 'can create a menu' do
          expect { subject }.to change { Menu.count }.by(1)
          expect(subject).to have_http_status(:ok)
        end
      end
      context 'when the start time is not specified' do
        let(:params) { valid_params.except(:start_at) }
        it 'returns 400' do
          expect { subject }.to change { Menu.count }.by(0)
          expect(subject).to have_http_status(:bad_request)
          expect(json['errors']['start_at']).to include '開始時刻を入力してください'
        end
      end
      context 'when the department is not specified' do
        let(:params) { valid_params.except(:department) }
        it 'returns 400' do
          expect { subject }.to change { Menu.count }.by(0)
          expect(subject).to have_http_status(:bad_request)
          expect(json['errors']['department']).to include '診療科を入力してください'
        end
      end
    end
  end

  describe 'DELETE /menus/:id' do
    let(:administrator) { create(:administrator) }
    let!(:menu) { create(:menu) }

    subject do
      delete api_admin_menu_destroy_path(id), as: :json
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
      let(:id) { menu.id }
      it 'deletes the menu' do
        expect { subject }.to change { Menu.count }.by(-1)
        expect(subject).to have_http_status(:ok)
      end

      it 'destroys the appointment associated with the deleted menu' do
        create(:appointment, menu_id: menu.id)
        expect { subject }.to change { Appointment.count }.by(0)
        expect(subject).to have_http_status(:bad_request)
        expect(json['message']).to include('予約が存在しているので削除できません')
      end
    end
  end
  describe 'DELETE /menus' do
    let(:base_day) { Date.parse('2021-09-05') }
    let(:administrator) { create(:administrator) }

    before do
      (1...7).each do |i|
        CreateDailyAppointmentMenuService.new(base_day + i.days).execute
      end
    end
    subject do
      delete api_admin_menus_path, as: :json, params: params
      response
    end
    let(:json) { JSON.parse(response.body) }
    let(:params) { nil }
    context 'when not logged in' do
      it 'returns 401' do
        expect(subject).to have_http_status(:unauthorized)
      end
    end
    context 'when logged in' do
      before do
        sign_in administrator
      end
      let(:params) { nil }
      it 'deletes all menu' do
        menu_count = Menu.count
        expect { subject }.to change { Menu.count }.by(-menu_count)
        expect(subject).to have_http_status(:ok)
      end

      context 'when specifing the day as min date and max date' do
        let(:params) do
          {
            min_date: '2021-09-09',
            max_date: '2021-09-09'
          }
        end
        it 'deletes all menus on the day' do
          # 2021年9月9日は木曜日で午前漢方診療で4枠
          expect { subject }.to change { Menu.count }.by(-4)
          expect(subject).to have_http_status(:ok)
        end
      end
    end
  end
end
