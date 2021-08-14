require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the Api::Admin::AppointmentsHelper. For example:
#
# describe Api::Admin::AppointmentsHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe Api::Admin::AppointmentsHelper, type: :helper do
  it 'is not used' do
    expect(true).to eq true
  end
end
