require "test_helper"

class CreateDailyAppointmentMenuServiceTest < ActiveSupport::TestCase
  setup do
    Menu.destroy_all
  end

  test "generate no menu on Saturday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-25")
    service.execute
    assert_equal Menu.count - before_count, 0
  end

  test "generate some physician menus on Monday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-26")
    service.execute
    assert_equal Menu.count - before_count, 13
    assert_equal "内科", Menu.last.department
  end

  test "generate some physician menus on Tuesday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-27")
    service.execute
    assert_equal Menu.count - before_count, 13
    assert_equal "内科", Menu.last.department
  end

  test "generate some physician menus on Wednesday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-28")
    service.execute
    assert_equal Menu.count - before_count, 13
    assert_equal "内科", Menu.last.department
  end

  test "does not generate kampo physician menus on Thursday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-29")
    service.execute
    assert_equal Menu.count - before_count, 0
  end

  test "generate some physician menus on Friday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-30")
    service.execute
    assert_equal Menu.count - before_count, 13
    assert_equal "内科", Menu.last.department
  end

  test "generate some physician menus on Saturday" do
    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-07-31")
    service.execute
    assert_equal Menu.count - before_count, 6
    assert_equal "内科", Menu.last.department
  end

  test "does not generate duplicate menu when there is an menu that day" do
    start_at = Time.parse("2021-08-02 9:00:00")
    Menu.create!(
      department: "内科",
      start_at: start_at,
      end_at: start_at + 30.minutes
    )

    before_count = Menu.count
    service = CreateDailyAppointmentMenuService.new("2021-08-02")
    service.execute
    assert_equal Menu.count - before_count, 12
    assert_equal 1, Menu.where(start_at: start_at).count
  end
end
