import client from "./client";

export type CreateAppointmentParameters = {
  first_name: string;
  last_name: string;
  first_kana_name: string;
  last_kana_name: string;
  birthday: string;
  is_first_visit: string;
  clinical_number: string;
  email: string;
  phone_number: string;
  reason: string;
  free_comment: string;
  menu_id: string;
};

export async function createAppointment(
  params: CreateAppointmentParameters
): Promise<string[]> {
  try {
    const res = await client.post("/api/v1/appointments/create", params);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
  return [];
}
