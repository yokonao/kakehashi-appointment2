# frozen_string_literal: true

namespace :menu do
  desc 'Create menus for two-week from tomorrow'
  task fortnight: :environment do
    before_count = Menu.count
    (1..15).each do |df|
      CreateDailyAppointmentMenuService.new(Date.today + df.days).execute
    end
    diff_count = Menu.count - before_count
    puts "#{diff_count}件の予約枠を作成しました"
  end

  desc 'Delete menus not filled before today'
  task purge: :environment do
    menus = Menu.garbage
    puts "#{menus.count}件の予約枠を削除します"
    Menu.garbage.destroy_all
  end
end
