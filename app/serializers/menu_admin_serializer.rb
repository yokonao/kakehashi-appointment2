# frozen_string_literal: true

class MenuAdminSerializer < ActiveModel::Serializer
  attribute :id
  attribute :department
  attribute :start_at
  attribute :end_at
  attribute :appointment_id

  def appointment_id
    return nil if object.appointment.empty?

    object.appointment.first.id
  end
end
