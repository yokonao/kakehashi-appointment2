require 'rails_helper'

RSpec.describe "Reacts", type: :request do
  describe "GET /form" do
    subject do
      get '/form'
      response
    end
    it 'returns 200' do
      expect(subject).to have_http_status(:ok)
    end
  end
end
