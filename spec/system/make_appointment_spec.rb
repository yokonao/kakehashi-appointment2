require 'rails_helper'

RSpec.describe Appointment, type: :system do
  context 'when input parameters is valid' do
    it 'makes an appointment for internal medicine', js: true do
      visit '/'
      expect(page).to have_text('診療科を選択')
      click_button '内科'
      expect(page).to have_text('内科外来予約')
      sleep 5
    end
  end
end
