import { FormValue } from "./FormValue";

export function validate(
  value: FormValue,
  requireReason: boolean
): {
  isValid: boolean;
  errors: { [field: string]: string[] };
} {
  let errors: { [field: string]: string[] } = {};
  if (!value.menu) {
    errors["menu"] = ["予約日時を選択してください"];
  }
  if (value.fullName.length === 0) {
    errors["fullName"] = ["氏名を入力してください"];
  }
  if (
    value.fullKanaName.length === 0 ||
    !/^[ァ-ヶー－| |　]+$/.test(value.fullKanaName)
  ) {
    errors["fullKanaName"] = ["氏名をカタカナで入力してください"];
  }
  if (!value.birthday) {
    errors["birthday"] = ["生年月日を数字8ケタで入力してください"];
  }
  if (value.phoneNumber.length === 0) {
    errors["phoneNumber"] = ["電話番号を入力してください"];
  } else if (!/^[0-9]{10,11}$/.test(value.phoneNumber)) {
    errors["phoneNumber"] = [
      "不正な電話番号です。ハイフン無し数字のみで入力してください",
    ];
  }
  if (value.email.length === 0) {
    errors["email"] = ["メールアドレスを入力してください"];
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value.email
    )
  ) {
    errors["email"] = ["不正なメールアドレスです"];
  }

  if (!value.karteInformation.isFirstVisit) {
    if (
      value.karteInformation.clinicalNumber.length > 0 &&
      !/^[0-9]{5}$/.test(value.karteInformation.clinicalNumber)
    ) {
      // 診察券番号が入力済みで数字5ケタでない場合はエラー
      errors["karteInformation"] = ["診察券番号は数字5ケタで入力してください"];
    }
  }

  if (requireReason && value.reason.length === 0) {
    errors["reason"] = ["受診理由を最低1つ選択してください"];
  }

  const isValid =
    Object.keys(errors)
      .map((key) => errors[key])
      .reduce((a, b) => [...a, ...b], []).length == 0;

  return { isValid: isValid, errors: errors };
}
