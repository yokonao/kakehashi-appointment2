# frozen_string_literal: true

namespace :appointment do
  desc 'create random appointment'
  task random: :environment do
    params = { first_name: '架橋',
               last_name: '花子',
               first_kana_name: 'カケハシ',
               last_kana_name: 'ハナコ',
               birthday: '1990-01-01',
               is_first_visit: false,
               clinical_number: '00001',
               email: 'test@example.com',
               phone_number: '0000000000',
               reason: '糖尿病,甲状腺,その他',
               free_comment: 'MyText' }
    ids = Menu.where(start_at: Time.now...).pluck(:id)
    throw '予約枠が存在しません' if ids.empty?
    10.times do
      Appointment.create(params.merge(menu_id: ids.sample))
    end
  end
end
