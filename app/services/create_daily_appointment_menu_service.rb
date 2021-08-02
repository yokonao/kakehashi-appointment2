# frozen_string_literal: true

# ある一日の予約メニューを一括で作成するサービスクラス
class CreateDailyAppointmentMenuService
  INTERVAL = 1800

  def initialize(date)
    @date = date.instance_of?(Date) ? date : Date.parse(date)
    @datetime = Time.parse(@date.to_s)
  end

  def execute
    create_reservable_start_time_array.map do |stamp|
      Menu.create(department: @date.wday == 4 ? '漢方' : '内科', start_at: Time.at(stamp))
    end
  end

  private

  def create_reservable_start_time_array
    case @date.wday
    when 0
      []
    when 1, 2, 3, 5
      create_time_every(opening_time, morning_closing_time) + create_time_every(afternoon_opening_time, closing_time)
    when 4
      create_time_every(opening_time, thursday_closing_time)
    when 6
      create_time_every(opening_time, saturday_morning_closing_time)
    end
  end

  def opening_time
    @datetime + 9.hours
  end

  def morning_closing_time
    @datetime + 12.hours + 30.minutes
  end

  def thursday_closing_time
    @datetime + 11.hours
  end

  def saturday_morning_closing_time
    @datetime + 12.hours
  end

  def afternoon_opening_time
    @datetime + 14.hours + 30.minutes
  end

  def closing_time
    @datetime + 17.hours + 30.minutes
  end

  def create_time_every(start_at, end_at)
    start_at.to_i.step(end_at.to_i - INTERVAL, INTERVAL).map { |stamp| Time.at(stamp) }
  end
end
