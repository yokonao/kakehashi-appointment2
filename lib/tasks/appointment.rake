# frozen_string_literal: true

def random_params
  is_first_visit = [true, false].sample
  clinical_number = is_first_visit ? '' : format('%05d', Random.rand(0..100))
  reason = { "糖尿病": [true, false].sample, "甲状腺": [true, false].sample, "その他": [true, false].sample }.select do |_k, v|
    v == true
  end.keys.join(',')
  params = {
    full_name: ForgeryJa(:name).full_name,
    full_kana_name: ForgeryJa(:name).full_name(to: ForgeryJa::KANA),
    birthday: ForgeryJa(:date).date,
    is_first_visit: is_first_visit,
    clinical_number: clinical_number,
    email: 'test@example.com',
    phone_number: '0000000000',
    reason: reason,
    free_comment: 'MyText'
  }
end

namespace :appointment do
  desc 'create random appointment'
  task random: :environment do
    ids = Menu.where(start_at: Time.now...).pluck(:id)
    throw '予約枠が存在しません' if ids.empty?
    10.times do
      Appointment.create(random_params.merge(menu_id: ids.sample))
    end
  end

  task test: :environment do
    random_params
  end
end
