require 'rails_helper'

describe EmailValidator do
  let(:clazz) do
    Struct.new(:email) do
      include ActiveModel::Validations
      validates :email, email: true
    end
  end

  describe '#validate_each' do
    subject { clazz.new(email) }

    context 'when valid email is specified' do
      [
        'a+b@plus-in-local.com',
        'a_b@underscore-in-local.com',
        'user@example.com',
        ' user@example.com ',
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org',
        '01234567890@numbers-in-local.net',
        'a@single-character-in-local.org',
        'one-character-third-level@a.example.com',
        'single-character-in-sld@x.org',
        'local@dash-in-sld.com',
        'letters-in-sld@123.com',
        'one-letter-sld@x.org',
        'uncommon-tld@sld.museum',
        'uncommon-tld@sld.travel',
        'uncommon-tld@sld.mobi',
        'country-code-tld@sld.uk',
        'country-code-tld@sld.rw',
        'local@sld.newTLD',
        'local@sub.domains.com',
        'aaa@bbb.co.jp',
        'nigel.worthington@big.co.uk',
        'f@c.com',
        'areallylongnameaasdfasdfasdfasdf@asdfasdfasdfasdfasdf.ab.cd.ef.gh.co.ca',
        'ящик@яндекс.рф',
        'test@test.testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttes',
        'hans,peter@example.com',
        'hans(peter@example.com',
        'hans)peter@example.com',
        'partially.\"quoted\"@sld.com',
        "&'*+-./=?^_{}~@other-valid-characters-in-local.net",
        'mixed-1234-in-{+^}-local@sld.net',
        'user@domain.рф',
        '寿司@example.com'
      ].each do |test|
        let(:email) { test }
        it { is_expected.to be_valid }
      end
    end
  end

  describe 'error messages' do
    subject { object.errors.messages }

    before { object.validate }

    let(:object) { clazz.new(email) }

    context 'when given invalid emails' do
      [
        '',
        '@hogehoge.com',
        ' @hogehgoe.com',
        'test@',
        'test@ ',
        ' ',
        'test.net',
        'test@test@example.com',
        'test:test@example.com',
        'test;test@example.com'
        # 'test..test@example.com',
        # 'test.@example.com'
      ].each do |test|
        let(:email) { test }
        it { is_expected.to eq(email: [I18n.t('errors.messages.invalid')]) }
      end
    end
  end
end
