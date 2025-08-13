require "test_helper"

class Api::V1::MenusTest < ActionDispatch::IntegrationTest
  setup do
    @base_day = Date.parse('2021-09-05')
    
    # Create menus for 6 days
    (1...7).each do |i|
      CreateDailyAppointmentMenuService.new(@base_day + i.days).execute
    end
  end

  test "GET /index returns all menu when no parameter is given" do
    get api_v1_menus_index_path, as: :json
    
    assert_response :ok
    json = JSON.parse(response.body)
    # 58 from CreateDailyAppointmentMenuService + 3 from fixtures
    assert_equal 61, json.length
  end

  test "GET /index returns menus of one day when min and max date is given" do
    params = { min_date: '2021-09-06', max_date: '2021-09-06' }
    get api_v1_menus_index_path, as: :json, params: params
    
    assert_response :ok
    json = JSON.parse(response.body)
    # 2021年9月6日は月曜日で午前診療+午後診療で13枠
    assert_equal 13, json.length
  end

  test "GET /index returns menus filled when all menu is already filled on the day" do
    day = '2021-09-11'
    params = { min_date: day, max_date: day }
    
    # Fill all menus on the specified day
    Menu.where(start_at: Time.parse(day)...(Time.parse(day) + 1.days)).each do |menu|
      Appointment.create!(
        full_name: "テスト #{menu.id}",
        full_kana_name: "テスト",
        birthday: '1990-01-01',
        is_first_visit: false,
        clinical_number: "0000#{menu.id}",
        email: "test#{menu.id}@example.com",
        phone_number: '0000000000',
        reason: 'テスト',
        free_comment: 'テスト',
        menu_id: menu.id
      )
    end
    
    get api_v1_menus_index_path, as: :json, params: params
    
    assert_response :ok
    json = JSON.parse(response.body)
    # 2021年9月11日は土曜日で午前診療で6枠
    assert_equal 6, json.length
    assert_equal true, json[0]['filled']
  end

  test "GET /index returns menus in between the range when date range is given" do
    # 9月6日は月曜、9月8日は水曜
    params = { min_date: '2021-09-06', max_date: '2021-09-08' }
    get api_v1_menus_index_path, as: :json, params: params
    
    assert_response :ok
    json = JSON.parse(response.body)
    # 一日13枠×3日
    assert_equal 39, json.length
  end
end