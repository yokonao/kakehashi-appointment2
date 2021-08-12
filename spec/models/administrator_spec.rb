require 'rails_helper'

RSpec.describe Administrator, type: :model do
  it 'is invalid when email does not exist' do
    admin = build(:administrator, email: nil)
    expect(admin.valid?).to eq false
  end

  it 'is invalid when password does not exist' do
    admin = build(:administrator, password: nil)
    expect(admin.valid?).to eq false
  end
  
  it 'is invalid when email is blank' do
    admin = build(:administrator, email: '')
    expect(admin.valid?).to eq false
  end

  it 'is invalid when password is blank' do
    admin = build(:administrator, password: '')
    expect(admin.valid?).to eq false
  end
end
