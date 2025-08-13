require "test_helper"

class Api::Admin::AppointmentsIndexTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @administrator = administrators(:admin_one)
    @menu1 = menus(:menu_one)
    @menu2 = menus(:menu_two)
    @valid_params = {
      full_name: '架橋 花子',
      full_kana_name: 'カケハシ ハナコ',
      birthday: '1990-01-01',
      is_first_visit: false,
      clinical_number: '00001',
      email: 'test@example.com',
      phone_number: '0000000000',
      reason: '糖尿病,脂質異常症',
      free_comment: 'MyText',
    }
    @appointment1 = Appointment.create!(@valid_params.merge(menu_id: @menu1.id))
    @appointment2 = Appointment.create!(@valid_params.merge(menu_id: @menu2.id))
  end

  teardown do
    @appointment1.destroy!
    @appointment2.destroy!
  end

  test "returns 401 when not logged in" do
    get api_admin_appointments_index_path, as: :json
    assert_response :unauthorized
  end

  test "returns all appointments when logged in" do
    sign_in @administrator
    get api_admin_appointments_index_path, as: :json
    assert_response :ok
    
    json = JSON.parse(response.body)
    assert_equal 2, json.length
  end

  test "contains start time when logged in" do
    sign_in @administrator
    get api_admin_appointments_index_path, as: :json
    assert_response :ok
    
    json = JSON.parse(response.body)
    assert_equal @appointment2.id, json[0]['id']
    assert_equal @menu2.start_at, Time.parse(json[0]['start_at'])
  end
end

class Api::Admin::AppointmentsDestroyTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @administrator = administrators(:admin_one)
    @menu1 = menus(:menu_one)
    @menu2 = menus(:menu_two)
    @valid_params = {
      full_name: '架橋 花子',
      full_kana_name: 'カケハシ ハナコ',
      birthday: '1990-01-01',
      is_first_visit: false,
      clinical_number: '00001',
      email: 'test@example.com',
      phone_number: '0000000000',
      reason: '糖尿病,脂質異常症',
      free_comment: 'MyText',
    }
    @appointment1 = Appointment.create!(@valid_params.merge(menu_id: @menu1.id))
    @appointment2 = Appointment.create!(@valid_params.merge(menu_id: @menu2.id))
  end

  teardown do
    @appointment1.destroy!
    @appointment2.destroy!
  end

  test "returns 401 when not logged in" do
    delete api_admin_appointment_destroy_path(@appointment1.id), as: :json, params: { reason: '時間変更のため' }
    assert_response :unauthorized
  end

  test "deletes the appointment when logged in" do
    sign_in @administrator
    assert_difference('Appointment.count', -1) do
      delete api_admin_appointment_destroy_path(@appointment1.id), as: :json, params: { reason: '時間変更のため' }
    end
    assert_response :ok
  end

  test "returns 400 when specified id does not exist" do
    sign_in @administrator
    delete api_admin_appointment_destroy_path(-1), as: :json, params: { reason: '時間変更のため' }
    assert_response :bad_request
  end

  test "returns 400 when not specified a reason for deletion" do
    sign_in @administrator
    delete api_admin_appointment_destroy_path(@appointment1.id), as: :json, params: { reason: nil }
    assert_response :bad_request
    
    json = JSON.parse(response.body)
    assert_equal '削除理由を入力してください', json['message']
  end
end
