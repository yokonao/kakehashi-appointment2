# frozen_string_literal: true

# module Tasks
#   class CreateTwoWeeksMenu
#     def self.execute(**_args)
#       (0..14).each do |df|
#         ::CreateDailyAppointmentMenuService.new(Date.today + df.days).execute
#       end
#     end
#   end
# end

namespace :menu do
  desc 'Run data updates'
  task two_week: :environment do
    (0..14).each do |df|
      CreateDailyAppointmentMenuService.new(Date.today + df.days).execute
    end
  end
end
