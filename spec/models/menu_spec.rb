require 'rails_helper'

RSpec.describe Menu, type: :model do
  context 'has the empty attribute and the empty is' do
    it 'department, so the menu is invalid' do
      menu = build(:menu, department: nil)
      expect(menu.valid?).to eq false
      expect(menu.errors[:department]).to include('を入力してください')
    end
    it 'start_at, so the menu is invalid' do
      menu = build(:menu, start_at: nil)
      expect(menu.valid?).to eq false
      expect(menu.errors[:start_at]).to include('を入力してください')
    end
    it 'end_at, so the menu is valid' do
      menu = build(:menu, end_at: nil)
      expect(menu.valid?).to eq true
    end
  end

  it 'is only one ever 30 minutes' do
    start_time = Time.parse('2021-08-01 15:00:00')
    create(:menu, start_at: start_time)
    create(:menu, start_at: start_time + 30.minutes)
    menu = build(:menu, start_at: start_time)
    expect(menu.valid?).to eq false
    expect(menu.errors[:start_at]).to include('が重複する予約メニューは設定できません')
    menu = build(:menu, start_at: start_time + 30.minutes)
    expect(menu.valid?).to eq false
    expect(menu.errors[:start_at]).to include('が重複する予約メニューは設定できません')
    menu = build(:menu, start_at: start_time - 30.minutes)
    expect(menu.valid?).to eq true
    menu = build(:menu, start_at: start_time + 1.hours)
    expect(menu.valid?).to eq true
  end
end
