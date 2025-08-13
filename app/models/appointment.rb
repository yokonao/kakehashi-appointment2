# frozen_string_literal: true

# Sceme information
# create_table "appointments", force: :cascade do |t|
#   t.string "full_name"
#   t.string "full_kana_name"
#   t.date "birthday"
#   t.boolean "is_first_visit"
#   t.string "clinical_number"
#   t.string "email"
#   t.string "phone_number"
#   t.string "reason"
#   t.text "free_comment"
#   t.datetime "created_at", precision: 6, null: false
#   t.datetime "updated_at", precision: 6, null: false
#   t.bigint "menu_id", null: false
#   t.index ["menu_id"], name: "index_appointments_on_menu_id"
# end
# fk menu_id

class Appointment < ApplicationRecord
  MAX_NAME_LENGTH = 50
  belongs_to :menu
  validates :full_name,
            presence: true,
            length: { maximum: MAX_NAME_LENGTH }
  validates :full_kana_name,
            presence: true,
            format: { with: /\A[ァ-ヶー－| |　]+\z/ }
  validates :birthday, presence: true
  validates :is_first_visit, inclusion: [ true, false ]
  validates :email, presence: true, email: true
  validates :phone_number, presence: true, format: { with: /\A[0-9]{10,11}\z/ }
  validates :reason, presence: true
  validates :menu, uniqueness: { message: "が一杯です。別の日時を選択してください" }

  def return_visit?
    !is_first_visit
  end
end
