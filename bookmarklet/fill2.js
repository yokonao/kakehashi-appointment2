const main = () => {
  // 日付をランダムに選択
  const slotButtons = document.querySelectorAll(".slot-button");
  slotButtons[Math.floor(Math.random() * slotButtons.length)].click();

  // input tag の値を設定
  // [id, value]
  const values = [
    ["full_name", "架橋　太郎"],
    ["full_kana_name", "カケハシ　タロウ"],
    ["birthday", "19800101"],
    ["phone_number", "0000000000"],
    ["email", "yokotukanao@gmail.com"],
    ["free_comment", "テストだよ"],
  ];
  values.forEach(([id, value]) => {
    document.getElementById(id).value = value;
  });

  document.querySelector(
    'input[name="is_first_visit"][value="true"]'
  ).checked = true;

  document.querySelector(
    'input[type="checkbox"][value="糖尿病"]'
  ).checked = true;
};

main();
