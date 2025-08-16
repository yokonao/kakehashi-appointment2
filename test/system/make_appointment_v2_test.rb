require "application_system_test_case"

class MakeAppointmentV2Test < ApplicationSystemTestCase
  setup do
    (1...7).each do |i|
      CreateDailyAppointmentMenuService.new(Date.today + i.days).execute
    end
  end

  test "makes an appointment using v2 form when input parameters are valid" do
    visit "/appointments/new"

    # ランダムに日付スロットを選択
    slot_buttons = all(".slot-button")
    refute slot_buttons.empty?, "No slot buttons found"
    slot_buttons.sample.click

    # フォームに入力
    fill_in "full_name", with: "架橋　太郎"
    fill_in "full_kana_name", with: "カケハシ　タロウ"
    fill_in "birthday", with: "19800101"
    fill_in "phone_number", with: "0000000000"
    fill_in "email", with: "kakehashi-appintment@example.com"

    # 初診を選択（はい）
    find('input[name="is_first_visit"][value="true"]').click

    # 疾患を選択
    find('input[type="checkbox"][value="糖尿病"]').check

    # 自由記入欄
    fill_in "free_comment", with: "テストだよ"

    # 予約実行前のカウント
    appointment_count_before = Appointment.count

    # 予約ボタンをクリック
    click_button "予約"

    # 予約成功の確認
    assert_text "予約が完了しました"
    assert_equal appointment_count_before + 1, Appointment.count

    # 予約内容の確認
    appointment = Appointment.last
    assert_equal "架橋　太郎", appointment.full_name
    assert_equal "カケハシ　タロウ", appointment.full_kana_name
    assert_equal "1980-01-01", appointment.birthday.to_s
    assert_equal "0000000000", appointment.phone_number
    assert_equal "kakehashi-appintment@example.com", appointment.email
    assert_equal true, appointment.is_first_visit
    assert_equal "テストだよ", appointment.free_comment
  end

  test "makes an appointment for returning patient using v2 form" do
    visit "/appointments/new"

    # ランダムに日付スロットを選択
    slot_buttons = all(".slot-button")
    refute slot_buttons.empty?, "No slot buttons found"
    slot_buttons.sample.click

    # フォームに入力
    fill_in "full_name", with: "テスト　花子"
    fill_in "full_kana_name", with: "テスト　ハナコ"
    fill_in "birthday", with: "19900315"
    fill_in "phone_number", with: "0901234567"
    fill_in "email", with: "test@example.com"

    # 再診を選択（いいえ）
    find('input[name="is_first_visit"][value="false"]').click

    # 診察券番号フィールドが表示されるのを待つ
    assert_selector "#clinical_number", visible: true

    # 診察券番号を入力（再診の場合）
    fill_in "clinical_number", with: "12345"

    # 疾患を複数選択
    find('input[type="checkbox"][value="糖尿病"]').check

    # 自由記入欄
    fill_in "free_comment", with: "再診のテスト\n特記事項あり"

    # 予約実行前のカウント
    appointment_count_before = Appointment.count

    # 予約ボタンをクリック
    click_button "予約"

    # 予約成功の確認
    assert_text "予約が完了しました"
    assert_equal appointment_count_before + 1, Appointment.count

    # 予約内容の確認
    appointment = Appointment.last
    assert_equal "テスト　花子", appointment.full_name
    assert_equal "テスト　ハナコ", appointment.full_kana_name
    assert_equal "1990-03-15", appointment.birthday.to_s
    assert_equal "0901234567", appointment.phone_number
    assert_equal "test@example.com", appointment.email
    assert_equal false, appointment.is_first_visit
    assert_equal "12345", appointment.clinical_number
    assert_equal "再診のテスト\r\n特記事項あり", appointment.free_comment
  end
end
