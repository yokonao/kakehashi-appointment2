class MenuSerializer < ActiveModel::Serializer
  attribute :id
  attribute :department
  attribute :start_at
  attribute :end_at
  attribute :filled

  def filled
    !object.appointment.empty?
  end
end
