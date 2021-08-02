# frozen_string_literal: true

# Sceme information
# create_table "appointments", force: :cascade do |t|
#   t.string "first_name"
#   t.string "last_name"
#   t.string "first_kana_name"
#   t.string "last_kana_name"
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
  belongs_to :menu
  validates :first_name, presence: true # TODO: 文字数制限
  validates :last_name, presence: true # TODO: 文字数制限
  validates :first_kana_name, presence: true # TODO: 文字数制限、かな制限
  validates :last_kana_name, presence: true # TODO: 文字数制限、かな制限
  validates :birthday, presence: true
  validates :is_first_visit, inclusion: [true, false]
  validates :clinical_number, presence: { message: '再診の方は診察券番号を入力してください' }, unless: :is_first_visit
  validates :email, presence: true # TODO: メールアドレスのバリデーション
  validates :phone_number, presence: true # TODO: 電話番号のバリデーション
  validates :reason, presence: true
  validates :menu_id, presence: true

  def return_visit?
    !is_first_visit
  end
end
