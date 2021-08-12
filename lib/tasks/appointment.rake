# frozen_string_literal: true

namespace :appointment do
  desc 'create random appointment'
  task random: :environment do
    params = { full_name: '架橋　花子',
               full_kana_name: 'カケハシ　ハナコ',
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
