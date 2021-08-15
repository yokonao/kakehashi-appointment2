export type AppointmentSerializer = {
  id: number;
  full_name: string;
  full_kana_name: string;
  birthday: Date;
  is_first_visit: boolean;
  clinical_number: string;
  email: string;
  phone_number: string;
  reason: string;
  free_comment: string;
  menu_id: number;
};

export const castToMenuSerializer = (data: any): AppointmentSerializer => {
  return {
    id: data.id,
    full_name: data.full_name,
    full_kana_name: data.full_kana_name,
    birthday: new Date(data.birthday),
    is_first_visit: data.is_first_visit,
    clinical_number: data.clinical_number,
    email: data.email,
    phone_number: data.phone_number,
    reason: data.reason,
    free_comment: data.free_comment,
    menu_id: data.menu_id,
  };
};
