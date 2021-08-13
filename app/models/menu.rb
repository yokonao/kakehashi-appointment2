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
  has_many :appointment, dependent: :destroy
  # validates :start_at, presence: true, uniqueness: true
  validates :start_at, presence: true
  validate :validate_start_time
  validates :end_at, presence: true
  before_validation :set_end_time
  validates :department, presence: true, inclusion: %w[内科 漢方]

  def set_end_time
    self.end_at = start_at + 30.minutes if start_at
  end

  def validate_start_time
    return unless start_at

    duplicate_menus = Menu.where(start_at: (start_at - 29.minutes)...(start_at + 30.minutes))
    errors.add(:start_at, 'が重複する予約メニューは設定できません') unless duplicate_menus.blank?
  end
end
