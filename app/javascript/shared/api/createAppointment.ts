import client from "./client";

export type CreateAppointmentParameters = {
  full_name: string;
  full_kana_name: string;
  birthday: string;
  is_first_visit: string;
  clinical_number: string;
  email: string;
  phone_number: string;
  reason: string;
  free_comment: string;
  menu_id: string;
};

type Result = {
  success: boolean;
  errors?: { [field: string]: string[] };
};

export async function createAppointment(
  params: CreateAppointmentParameters
): Promise<Result> {
  try {
    const res = await client.post("/api/v1/appointments/create", params);
    const json = JSON.parse(JSON.stringify(res.data));
    if (json["errors"]) {
      return {
        success: false,
        errors: {
          ...json["errors"],
          notification: ["予約が成立しませんでした"],
        },
      };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      errors: { notification: ["サーバーとの通信に失敗しました"] },
    };
  }
}
