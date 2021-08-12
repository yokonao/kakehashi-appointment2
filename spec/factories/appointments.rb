FactoryBot.define do
  factory :appointment do
    full_name { '架橋 花子' }
    full_kana_name { 'カケハシ ハナコ' }
    birthday { '2021-08-01' }
    is_first_visit { false }
    clinical_number { '00099' }
    email { 'test@example.com' }
    phone_number { '0000000000' }
    reason { 'MyString' }
    free_comment { 'MyText' }
  end

  factory :valid_appointment, parent: :appointment do
    association :menu,
                factory: :menu,
                strategy: :create
  end
end
