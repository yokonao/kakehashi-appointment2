# frozen_string_literal: true

namespace :menu do
  desc 'execute daily for creating and deleting menus'
  task daily: :environment do
    Rake::Task['menu:prepare'].invoke(60, 60)
    Rake::Task['menu:purge'].invoke
  end

  desc 'Create menus for specified duration'
  task :prepare, %w[min_num max_num] => :environment do |_, args|
    before_count = Menu.count
    (args.min_num.to_i..args.max_num.to_i).each do |df|
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
