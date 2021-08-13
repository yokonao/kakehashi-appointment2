# frozen_string_literal: true

namespace :menu do
  desc 'Run data updates'
  task two_week: :environment do
    (1..15).each do |df|
      CreateDailyAppointmentMenuService.new(Date.today + df.days).execute
    end
  end
end
