# frozen_string_literal: true

# Scheme information
# create_table "menus", force: :cascade do |t|
#   t.integer "department"
#   t.datetime "start_at"
#   t.datetime "end_at"
#   t.datetime "created_at", precision: 6, null: false
#   t.datetime "updated_at", precision: 6, null: false
# end

# 予約枠モデル
class Menu < ApplicationRecord
  has_many :appointment
  validates :start_at, :end_at, presence: true
  before_validation :set_end_time
  validates :department, presence: true, inclusion: %w[内科 漢方]

  def set_end_time
    self.end_at = start_at + 30.minutes if start_at
  end
end
