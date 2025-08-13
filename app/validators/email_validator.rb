# frozen_string_literal: true

require "mail"

class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    begin
      mail = Mail::Address.new(value)

      # check legal address
      valid = mail.domain && mail.address == value

      # check domain for mail address.
      valid &&= mail.domain.split(".").length > 1
    rescue StandardError => _e
      valid = false
    end

    record.errors.add(attribute, I18n.t("errors.messages.invalid")) unless valid
  end
end
