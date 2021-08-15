class AppointmentAdminSerializer < ActiveModel::Serializer
  attribute :id
  attribute :full_name
  attribute :full_kana_name
  attribute :birthday
  attribute :is_first_visit
  attribute :clinical_number
  attribute :email
  attribute :phone_number
  attribute :reason
  attribute :free_comment
  attribute :start_at

  def start_at
    object.menu.start_at
  end
end
