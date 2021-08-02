FactoryBot.define do
  factory :appointment do
    first_name { 'MyString' }
    last_name { 'MyString' }
    first_kana_name { 'MyString' }
    last_kana_name { 'MyString' }
    birthday { '2021-08-01' }
    is_first_visit { false }
    clinical_number { 'MyString' }
    email { 'MyString' }
    phone_number { 'MyString' }
    reason { 'MyString' }
    free_comment { 'MyText' }
  end

  factory :valid_appointment, parent: :appointment do
    association :menu,
                factory: :menu,
                strategy: :create
  end
end
