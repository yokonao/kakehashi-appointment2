require 'rails_helper'

RSpec.describe CreateDailyAppointmentMenuService, type: :helper do
  context 'when there is no menu' do
    it 'generate no menu on Saturday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-25')
      service.execute
      expect(Menu.count).to eq 0
    end

    it 'generate some physician menus on Monday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-26')
      service.execute
      expect(Menu.count).to eq 13
      expect(Menu.first.department).to eq '内科'
    end

    it 'generate some physician menus on Tuesday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-27')
      service.execute
      expect(Menu.count).to eq 13
      expect(Menu.first.department).to eq '内科'
    end

    it 'generate some physician menus on Wednesday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-28')
      service.execute
      expect(Menu.count).to eq 13
      expect(Menu.first.department).to eq '内科'
    end

    it 'generate kampo physician menus on Thursday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-29')
      service.execute
      expect(Menu.count).to eq 4
      expect(Menu.first.department).to eq '漢方'
    end

    it 'generate some physician menus on Friday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-30')
      service.execute
      expect(Menu.count).to eq 13
      expect(Menu.first.department).to eq '内科'
    end

    it 'generate some physician menus on Saturday' do
      service = CreateDailyAppointmentMenuService.new('2021-07-31')
      service.execute
      expect(Menu.count).to eq 6
      expect(Menu.first.department).to eq '内科'
    end
  end

  context 'there is an menu that day' do
    let(:start_at) { Time.parse('2021-08-02 9:00:00') }
    let!(:menu) { create(:menu, start_at: start_at) }
    it 'does not generate duplicate menu' do
      service = CreateDailyAppointmentMenuService.new('2021-08-02')
      service.execute
      expect(Menu.count).to eq 13
      expect(Menu.where(start_at: start_at).count).to eq 1
    end
  end
end
