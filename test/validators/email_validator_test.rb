require "test_helper"

class EmailValidatorTest < ActiveSupport::TestCase
  class User
    include ActiveModel::Model

    attr_accessor :email
    validates :email, email: true
  end

  test "validates valid email addresses" do
    valid_emails =       [
        "a+b@plus-in-local.com",
        "a_b@underscore-in-local.com",
        "user@example.com",
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org",
        "01234567890@numbers-in-local.net",
        "a@single-character-in-local.org",
        "one-character-third-level@a.example.com",
        "single-character-in-sld@x.org",
        "local@dash-in-sld.com",
        "letters-in-sld@123.com",
        "one-letter-sld@x.org",
        "uncommon-tld@sld.museum",
        "uncommon-tld@sld.travel",
        "uncommon-tld@sld.mobi",
        "country-code-tld@sld.uk",
        "country-code-tld@sld.rw",
        "local@sld.newTLD",
        "local@sub.domains.com",
        "aaa@bbb.co.jp",
        "nigel.worthington@big.co.uk",
        "f@c.com",
        "areallylongnameaasdfasdfasdfasdf@asdfasdfasdfasdfasdf.ab.cd.ef.gh.co.ca",
        "ящик@яндекс.рф",
        "test@test.testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttes",
        "&'*+-./=?^_{}~@other-valid-characters-in-local.net",
        "mixed-1234-in-{+^}-local@sld.net",
        "user@domain.рф",
        "寿司@example.com"
      ]

    valid_emails.each do |email|
      object = User.new(email: email)
      assert object.valid?, "Expected '#{email}' to be valid"
    end
  end

  test "invalidates invalid email addresses with proper error messages" do
    invalid_emails = [
      "",
      "@hogehoge.com",
      " @hogehgoe.com",
      "test@",
      "test@ ",
      " ",
      "test.net",
      "test@test@example.com",
      "test:test@example.com",
      "test;test@example.com"
    ]

    invalid_emails.each do |email|
      object = User.new(email: email)
      object.validate
      assert_not object.valid?, "Expected '#{email}' to be invalid"
      assert_equal [ I18n.t("errors.messages.invalid") ], object.errors.messages[:email],
                   "Expected error message for '#{email}'"
    end
  end
end
