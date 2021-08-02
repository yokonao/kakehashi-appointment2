FactoryBot.define do
  factory :appointment do
    first_name { 'MyString' }
    last_name { 'MyString' }
    first_kana_name { 'カケハシ' }
    last_kana_name { 'ハナコ' }
    birthday { '2021-08-01' }
    is_first_visit { false }
    clinical_number { 'MyString' }
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
