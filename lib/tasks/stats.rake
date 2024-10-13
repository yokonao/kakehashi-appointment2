# frozen_string_literal: true

namespace :stats do
  task daily: :environment do
    stats = StatsService.new.execute
    StatsMailer.with(stats: stats).daily_email.deliver_now
  end
end
