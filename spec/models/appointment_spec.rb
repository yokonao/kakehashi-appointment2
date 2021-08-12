require 'rails_helper'

RSpec.describe Appointment, type: :model do
  let!(:menu) { create(:menu, start_at: '2021-07-21 09:30:00') }

  it 'is valid using valid_appointment factory' do
    appointment = build(:valid_appointment)
    expect(appointment.valid?).to eq true
  end

  it 'is valid when appointment has a menu' do
    appointment = build(:appointment, menu_id: menu.id)
    expect(appointment.valid?).to eq true
  end

  context 'when an attribute is empty' do
    it 'is invalid when appointment does not have full name' do
      appointment = build(:valid_appointment, full_name: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:full_name]).to include('を入力してください')
    end

    it 'is invalid when appointment does not have full kana name' do
      appointment = build(:valid_appointment, full_kana_name: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:full_kana_name]).to include('を入力してください')
    end

    it 'is valid when appointment contains full-width space in full kana name' do
      appointment = build(:valid_appointment, full_name: 'カケハシ　ハナコ')
      expect(appointment.valid?).to eq true
    end

    it 'is invalid when appointment does not have birthday' do
      appointment = build(:valid_appointment, birthday: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:birthday]).to include('を入力してください')
    end

    it 'is invalid when appointment is unclear whether it is the first visit' do
      appointment = build(:valid_appointment, is_first_visit: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:is_first_visit]).to include('は一覧にありません')
    end

    it 'is invalid when appointment does not have email' do
      appointment = build(:valid_appointment, email: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:email]).to include('を入力してください')
    end

    it 'is invalid when appointment does not have phone number' do
      appointment = build(:valid_appointment, phone_number: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:phone_number]).to include('を入力してください')
    end
    it 'is invalid when appointment does not have reason for consultation' do
      appointment = build(:valid_appointment, reason: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:reason]).to include('を入力してください')
    end

    it 'is valid when appointment does not have freee comment' do
      appointment = build(:valid_appointment, free_comment: nil, menu_id: menu.id)
      appointment.valid?
      expect(appointment.valid?).to eq true
    end

    it 'is invalid when appointment has no menu' do
      appointment = build(:valid_appointment, menu_id: nil)
      expect(appointment.valid?).to eq false
    end
  end

  context 'when the full name is invalid' do
    it 'has too long full name' do
      appointment = build(:valid_appointment, full_name: (0...100).map{ (65 + rand(26)).chr }.join)
      expect(appointment.valid?).to eq false
    end
  end

  context 'when the full kana name is invalid' do
    it 'has too long last name' do
      appointment = build(:valid_appointment, full_kana_name: 'longlonglonglonglonglong')
      expect(appointment.valid?).to eq false
    end

    it 'has the first kana name contains hiragana character' do
      appointment = build(:valid_appointment, full_kana_name: 'かけはし はなこ')
      expect(appointment.valid?).to eq false
    end

    it 'has the first kana name contains some symbol' do
      appointment = build(:valid_appointment, full_kana_name: 'カケハシ@+-ハナコ')
      expect(appointment.valid?).to eq false
    end

    it 'has the first kana name contains some alphabet' do
      appointment = build(:valid_appointment, full_kana_name: 'Kakehashi Hanako')
      expect(appointment.valid?).to eq false
    end
  end

  it 'has invalid mail address and is invalid' do
    appointment = build(:valid_appointment, email: 'hogehoge')
    expect(appointment.valid?).to eq false
    expect(appointment.errors[:email]).to include('は不正な値です')
  end

  # test@example.comあいうえお のようなメールアドレスは受け入れてしまう
  # it 'has mail address has hiragana prefix and is invalid' do
  #   appointment = build(:valid_appointment, email: 'test@example.comあいうえお')
  #   expect(appointment.valid?).to eq false
  #   expect(appointment.errors[:email]).to include('は不正な値です')
  # end

  it 'has invalid phone number and is invalid' do
    appointment = build(:valid_appointment, phone_number: '`+*#$$Q')
    expect(appointment.valid?).to eq false
    expect(appointment.errors[:phone_number]).to include('は不正な値です')
  end
end
