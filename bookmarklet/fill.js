// https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-change-or-input-event-in-react-js#46012210
const setValue = (element, value) => {
  if (element.tagName === "INPUT") {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeSetter.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (element.tagName === "TEXTAREA") {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;
    nativeSetter.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  }
};

const main = () => {
  const menuButtons = Array.from(
    document.querySelector(".MuiTable-root").querySelectorAll("button")
  );
  for (const button of menuButtons) {
    if (!button.disabled) {
      button.click();
      break;
    }
  }
  const values = [
    ["full_name", "架橋　太郎"],
    ["full_kana_name", "カケハシ　タロウ"],
    ["birthday", "19800101"],
    ["phone-number", "0000000000"],
    ["email", "yokotukanao@gmail.com"],
    ["free-comment", "テストだよ"],
  ];

  values.forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) {
      setValue(input, value);
    }
  });

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox.value === "糖尿病") {
      checkbox.click();
    }
  });
};

main();
