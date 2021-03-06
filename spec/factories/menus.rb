FactoryBot.define do
  factory :menu do
    department { '内科' }
    start_at { "2021-07-21 09:00:00" }
    end_at { "2021-07-21 09:30:00" }
  end
  factory :menu_kampo, class: Menu do
    department { '内科' }
    start_at { "2021-07-21 09:30:00" }
    end_at { "2021-07-21 10:00:00" }
  end
end
