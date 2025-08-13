require "test_helper"

class Api::V1::AppointmentsTest < ActionDispatch::IntegrationTest
  setup do
    @menu = menus(:one)
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
      menu_id: @menu.id
    }
  end

  test "POST /create raises ActionController::ParameterMissing error when no parameter is given" do
    assert_raises(ActionController::ParameterMissing) do
      post api_v1_appointments_create_path, as: :json, params: { appointment: nil }
    end
  end

  test "POST /create can create an appointment when valid parameters are given" do
    assert_difference('Appointment.count', 1) do
      post api_v1_appointments_create_path, as: :json, params: { appointment: @valid_params }
    end
    assert_response :ok
  end

  test "POST /create returns an error when the menu is not specified" do
    params = @valid_params.except(:menu_id)
    
    assert_no_difference('Appointment.count') do
      post api_v1_appointments_create_path, as: :json, params: { appointment: params }
    end
    
    assert_response :ok
    json = JSON.parse(response.body)
    assert_includes json['errors']['menu'], '予約枠を入力してください'
  end

  test "POST /create returns an error when the specified menu does not exist" do
    params = @valid_params.merge(menu_id: -1)
    
    assert_no_difference('Appointment.count') do
      post api_v1_appointments_create_path, as: :json, params: { appointment: params }
    end
    
    assert_response :ok
    json = JSON.parse(response.body)
    assert_includes json['errors']['menu'], '予約枠を入力してください'
  end

  test "POST /create returns an error when the specified menu is already filled" do
    # Create an appointment to fill the menu
    Appointment.create!(
      full_name: '既存 太郎',
      full_kana_name: 'キゾン タロウ',
      birthday: '1985-01-01',
      is_first_visit: true,
      clinical_number: '00000',
      email: 'existing@example.com',
      phone_number: '1111111111',
      reason: '検査',
      free_comment: '既存の予約',
      menu_id: @menu.id
    )
    
    assert_no_difference('Appointment.count') do
      post api_v1_appointments_create_path, as: :json, params: { appointment: @valid_params }
    end
    
    assert_response :ok
    json = JSON.parse(response.body)
    assert_includes json['errors']['menu'], '予約枠が一杯です。別の日時を選択してください'
  end
end
