import { format } from "date-fns";
import { KarteInformation } from "../../../domain/KarteInformation";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import { CreateAppointmentParameters } from "../../../shared/api/createAppointment";

export type FormValue = {
  fullName: string;
  fullKanaName: string;
  menu?: MenuSerializer;
  birthday?: Date;
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

export function createPostParameters(value: FormValue): CreateAppointmentParameters {
  if (!value.birthday || !value.menu) {
    throw new Error("フォームの状態が不完全です");
  }
  return {
    full_name: value.fullName,
    full_kana_name: value.fullKanaName,
    birthday: format(value.birthday, "yyyy-MM-dd"),
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
