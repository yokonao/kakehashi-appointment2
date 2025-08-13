require 'test_helper'

class MenuTest < ActiveSupport::TestCase
  def valid_menu_attributes
    {
      department: '内科',
      start_at: '2021-08-01 15:00:00',
      end_at: '2021-08-01 15:30:00'
    }
  end

  test "department is empty so the menu is invalid" do
    menu = Menu.new(valid_menu_attributes.merge(department: nil))
    assert_not menu.valid?
    assert_includes menu.errors[:department], 'を入力してください'
  end

  test "start_at is empty so the menu is invalid" do
    menu = Menu.new(valid_menu_attributes.merge(start_at: nil))
    assert_not menu.valid?
    assert_includes menu.errors[:start_at], 'を入力してください'
  end

  test "end_at is empty so the menu is valid" do
    menu = Menu.new(valid_menu_attributes.merge(end_at: nil))
    assert menu.valid?
  end

  test "is only one ever 30 minutes" do
    start_time = Time.parse('2021-08-01 15:00:00')
    Menu.create!(department: '内科', start_at: start_time, end_at: start_time + 30.minutes)
    Menu.create!(department: '内科', start_at: start_time + 30.minutes, end_at: start_time + 60.minutes)
    
    menu = Menu.new(department: '内科', start_at: start_time, end_at: start_time + 30.minutes)
    assert_not menu.valid?
    assert_includes menu.errors[:start_at], 'が重複する予約メニューは設定できません'
    
    menu = Menu.new(department: '内科', start_at: start_time + 30.minutes, end_at: start_time + 60.minutes)
    assert_not menu.valid?
    assert_includes menu.errors[:start_at], 'が重複する予約メニューは設定できません'
    
    menu = Menu.new(department: '内科', start_at: start_time - 30.minutes, end_at: start_time)
    assert menu.valid?
    
    menu = Menu.new(department: '内科', start_at: start_time + 1.hours, end_at: start_time + 90.minutes)
    assert menu.valid?
  end
end