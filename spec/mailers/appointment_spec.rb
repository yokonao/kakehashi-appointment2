require 'rails_helper'

RSpec.describe AppointmentMailer, type: :mailer do
  before do
    allow(ENV).to receive(:[]).and_call_original
    allow(ENV).to receive(:[]).with('CUSTOM_DOMAIN_ADDRESS').and_return('web.appointment@example.com')
    allow(ENV).to receive(:[]).with('DOCTOR_ADDRESS').and_return('doctor@example.com')
  end
  context 'when no appointment given' do
    let(:mail) { AppointmentMailer.appointment_email }
    it 'raise error' do
      expect { mail.deliver_now }.to raise_error(NoMethodError)
    end
  end

  context 'when generating appointment email' do
    let(:appointment) { create(:valid_appointment) }
    let(:mail) { AppointmentMailer.with(appointment: appointment).appointment_email }
    it 'render the headers and body' do
      expect(mail.subject).to eq '予約が成立しました'
      expect(mail.to).to include appointment.email
      # 今はクラス変数として指定しておりテストできない
      # いつか書き換える
      # expect(mail.from).to include 'web.appointment@example.com'
    end
  end

  context 'when generating notification email' do
    let(:appointment) { create(:valid_appointment) }
    let(:mail) { AppointmentMailer.with(appointment: appointment).notification_email }
    it 'render the headers and body' do
      expect(mail.subject).to eq 'WEB予約が一件入りました'
      expect(mail.to).to include 'doctor@example.com'
      # 今はクラス変数として指定しておりテストできない
      # いつか書き換える
      # expect(mail.from).to include 'web.appointment@example.com'
    end
  end
end
