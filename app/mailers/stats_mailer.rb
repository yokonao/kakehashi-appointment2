# frozen_string_literal: true

class StatsMailer < ApplicationMailer
  default from: ENV['CUSTOM_DOMAIN_ADDRESS']

  def daily_email
    @stats = params[:stats]
    mail(to: ENV['DEVELOPER_ADDRESS'], subject: 'アプリケーションの日時集計結果')
  end
end
