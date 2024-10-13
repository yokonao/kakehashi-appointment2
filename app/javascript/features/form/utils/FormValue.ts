import { format, parse } from "date-fns";
import { KarteInformation } from "../../../domain/KarteInformation";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import { CreateAppointmentParameters } from "../../../shared/api/createAppointment";

export type FormValue = {
  fullName: string;
  fullKanaName: string;
  menu?: MenuSerializer;
  birthday?: string;
  phoneNumber: string;
  email: string;
  karteInformation: KarteInformation;
  reason: string;
  freeComment: string;
};

export const initialValues: FormValue = {
  phoneNumber: "",
  email: "",
  fullName: "",
  fullKanaName: "",
  karteInformation: {
    isFirstVisit: true,
    clinicalNumber: "",
  },
  reason: "",
  freeComment: "",
};

// reasonが独自の固定値になっている
export const initialValuesKampo: FormValue = {
  ...initialValues,
  reason: "漢方希望",
};

export function createPostParameters(
  value: FormValue
): CreateAppointmentParameters {
  if (!value.birthday || !value.menu) {
    throw new Error("フォームの状態が不完全です");
  }
  const birthday = format(
    parse(value.birthday, "yyyyMMdd", new Date()),
    "yyyy-MM-dd"
  );
  return {
    full_name: value.fullName,
    full_kana_name: value.fullKanaName,
    birthday: birthday,
    is_first_visit: value.karteInformation.isFirstVisit.toString(),
    clinical_number: value.karteInformation.isFirstVisit
      ? ""
      : value.karteInformation.clinicalNumber,
    email: value.email,
    phone_number: value.phoneNumber,
    reason: value.reason,
    free_comment: value.freeComment,
    menu_id: value.menu.id.toString(),
  };
}
