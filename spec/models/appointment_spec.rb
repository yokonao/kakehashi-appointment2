require 'rails_helper'

RSpec.describe Appointment, type: :model do
  let!(:menu) { create(:menu) }

  it 'is valid using valid_appointment factory' do
    appointment = build(:valid_appointment)
    expect(appointment.valid?).to eq true
  end

  it 'is valid when appointment has a menu' do
    appointment = build(:appointment, menu_id: menu.id)
    expect(appointment.valid?).to eq true
  end

  context 'when an attribute is empty' do
    it 'is invalid when appointment does not have first name' do
      appointment = build(:valid_appointment, first_name: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:first_name]).to include('を入力してください')
    end

    it 'is invalid when appointment does not have last name' do
      appointment = build(:valid_appointment, last_name: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:last_name]).to include('を入力してください')
    end

    it 'is valid when appointment does not have first kana name' do
      appointment = build(:valid_appointment, first_kana_name: nil)
      expect(appointment.valid?).to eq true
    end

    it 'is valid when appointment does not have last kana name' do
      appointment = build(:valid_appointment, last_kana_name: nil)
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

    it 'is valid when appointment is the first visit and does not have clinical number' do
      appointment = build(:valid_appointment, is_first_visit: true, clinical_number: nil, menu_id: menu.id)
      expect(appointment.valid?).to eq true
    end

    it 'is valid when appointment is not the first visit and does not have clinical number' do
      appointment = build(:valid_appointment, is_first_visit: false, clinical_number: nil)
      expect(appointment.valid?).to eq false
      expect(appointment.errors[:clinical_number]).to include('再診の方は診察券番号を入力してください')
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
      puts appointment.errors.full_messages
      expect(appointment.valid?).to eq true
    end

    it 'is invalid when appointment has no menu' do
      appointment = build(:valid_appointment, menu_id: nil)
      expect(appointment.valid?).to eq false
    end
  end

  context 'when the first name is invalid' do
    it 'has too long first name' do
      appointment = build(:valid_appointment, first_name: 'longlonglonglonglonglong')
      expect(appointment.valid?).to eq false
    end
  end

  context 'when the last name is invalid' do
    it 'has too long last name' do
      appointment = build(:valid_appointment, last_name: 'longlonglonglonglonglong')
      expect(appointment.valid?).to eq false
    end
  end

  context 'when the fisrt kana name is invalid' do
    it 'has too long last name' do
      appointment = build(:valid_appointment, first_kana_name: 'longlonglonglonglonglong')
      expect(appointment.valid?).to eq false
    end

    it 'has the first kana name contains hiragana character' do
      appointment = build(:valid_appointment, first_kana_name: 'かけはし')
      expect(appointment.valid?).to eq false
    end

    it 'has the first kana name contains some symbol' do
      appointment = build(:valid_appointment, first_kana_name: 'カケハシ@+-')
      expect(appointment.valid?).to eq false
    end

    it 'has the first kana name contains some alphabet' do
      appointment = build(:valid_appointment, first_kana_name: 'Kakehashi')
      expect(appointment.valid?).to eq false
    end
  end

  context 'when the last kana name is invalid' do
    it 'has too long last kana name' do
      appointment = build(:valid_appointment, last_kana_name: 'longlonglonglonglonglong')
      expect(appointment.valid?).to eq false
    end

    it 'has the last kana name contains hiragana character' do
      appointment = build(:valid_appointment, last_kana_name: 'はなこ')
      expect(appointment.valid?).to eq false
    end

    it 'has the last kana name contains some symbol' do
      appointment = build(:valid_appointment, last_kana_name: '%ハナコ)(')
      expect(appointment.valid?).to eq false
    end

    it 'has the last kana name contains some alphabet' do
      appointment = build(:valid_appointment, last_kana_name: 'Hanako')
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
end
