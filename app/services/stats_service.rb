# frozen_string_literal: true

# 直近の予約取得状況を返すサービスクラス
class StatsService
  MAX_DAILY_FETCH_COUNT = 10

  def execute(type: :daily)
    appointments = Appointment.order(id: :desc).limit(MAX_DAILY_FETCH_COUNT)
    count = appointments.count { |appointment| appointment.created_at > 1.day.ago }
    {
      appointment_count: count == MAX_DAILY_FETCH_COUNT ? "#{count}+" : count.to_s,
      latest_appointment_created_at: appointments.first&.created_at
    }
  end
end
