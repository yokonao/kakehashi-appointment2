require "test_helper"

class Api::Admin::MenusIndexTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @base_day = Date.parse('2021-09-05')
    @administrator = administrators(:admin_one)

    (1...7).each do |i|
      CreateDailyAppointmentMenuService.new(@base_day + i.days).execute
    end
  end

  test "returns 401 when not logged in" do
    get api_admin_menus_index_path, as: :json
    assert_response :unauthorized
  end

  test "returns all menu when logged in with no parameter" do
    sign_in @administrator
    get api_admin_menus_index_path, as: :json
    assert_response :ok

    json = JSON.parse(response.body)
    # 58 from CreateDailyAppointmentMenuService + 2 from fixtures
    assert_equal 60, json.length
  end

  test "contains appointment id when all menu is already filled on the day" do
    sign_in @administrator

    appointments = []
    Menu.all.each do |menu|
      appointments << Appointment.create!(
        full_name: 'テスト 太郎',
        full_kana_name: 'テスト タロウ',
        birthday: '1990-01-01',
        is_first_visit: false,
        email: 'test@example.com',
        phone_number: '09012345678',
        clinical_number: '123456',
        reason: '予約理由',
        menu_id: menu.id
      )
    end

    get api_admin_menus_index_path, as: :json
    assert_response :ok

    json = JSON.parse(response.body)
    # 58 from CreateDailyAppointmentMenuService + 2 from fixtures
    assert_equal 60, json.length
    assert_not_nil json[0]['appointment_id']

    appointments.each(&:destroy!)
  end
end

class Api::Admin::MenusCreateTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @administrator = administrators(:admin_one)
    @valid_params = {
      start_at: '2021-07-21 09:00:00',
      department: '内科'
    }
  end

  test "returns 401 when not logged in" do
    post api_admin_menus_create_path, as: :json, params: { menu: @valid_params }
    assert_response :unauthorized
  end

  test "raises ActionController::ParameterMissing error when no parameter is given" do
    sign_in @administrator
    assert_raises(ActionController::ParameterMissing) do
      post api_admin_menus_create_path, as: :json, params: { menu: nil }
    end
  end

  test "can create a menu with valid parameters" do
    sign_in @administrator
    assert_difference('Menu.count', 1) do
      post api_admin_menus_create_path, as: :json, params: { menu: @valid_params }
    end
    assert_response :ok
  end

  test "returns 400 when the start time is not specified" do
    sign_in @administrator
    params = @valid_params.except(:start_at)
    assert_no_difference('Menu.count') do
      post api_admin_menus_create_path, as: :json, params: { menu: params }
    end
    assert_response :bad_request

    json = JSON.parse(response.body)
    assert_includes json['errors']['start_at'], '開始時刻を入力してください'
  end

  test "returns 400 when the department is not specified" do
    sign_in @administrator
    params = @valid_params.except(:department)
    assert_no_difference('Menu.count') do
      post api_admin_menus_create_path, as: :json, params: { menu: params }
    end
    assert_response :bad_request

    json = JSON.parse(response.body)
    assert_includes json['errors']['department'], '診療科を入力してください'
  end
end


class Api::Admin::MenusDestroyTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @administrator = administrators(:admin_one)
    @menu = menus(:menu_one)
  end

  test "returns 401 when not logged in" do
    delete api_admin_menu_destroy_path(@menu.id), as: :json
    assert_response :unauthorized
  end

  test "deletes the menu when logged in" do
    sign_in @administrator
    assert_difference('Menu.count', -1) do
      delete api_admin_menu_destroy_path(@menu.id), as: :json
    end
    assert_response :ok
  end

  test "cannot delete when appointment exists for the menu" do
    sign_in @administrator
    Appointment.create!(
      full_name: 'テスト 太郎',
      full_kana_name: 'テスト タロウ',
      birthday: '1990-01-01',
      is_first_visit: false,
      email: 'test@example.com',
      phone_number: '09012345678',
      clinical_number: '123456',
      reason: '予約理由',
      menu_id: @menu.id
    )

    assert_no_difference('Appointment.count') do
      delete api_admin_menu_destroy_path(@menu.id), as: :json
    end
    assert_response :bad_request

    json = JSON.parse(response.body)
    assert_includes json['message'], '予約が存在しているので削除できません'
  end
end


class Api::Admin::MenusDestroyDailyTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @base_day = Date.parse('2021-09-05')
    @administrator = administrators(:admin_one)

    (1...7).each do |i|
      CreateDailyAppointmentMenuService.new(@base_day + i.days).execute
    end
  end

  test "returns 401 when not logged in" do
    delete api_admin_menus_path, as: :json
    assert_response :unauthorized
  end

  test "deletes all menu when logged in with no parameter" do
    sign_in @administrator
    menu_count = Menu.count
    assert_difference('Menu.count', -menu_count) do
      delete api_admin_menus_path, as: :json
    end
    assert_response :ok
  end

  test "deletes all menus on the day when specifying the day as min date and max date" do
    sign_in @administrator
    params = {
      min_date: '2021-09-08',
      max_date: '2021-09-08'
    }
    # 2021年9月8日は水曜日で午前午後合わせて13枠
    assert_difference('Menu.count', -13) do
      delete api_admin_menus_path, as: :json, params: params
    end
    assert_response :ok
  end
end
