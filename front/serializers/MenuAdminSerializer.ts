export type MenuAdminSerializer = {
  id: number;
  department: string;
  start_at: Date;
  end_at: Date;
  appointment_id: number;
};

export const castToMenuAdminSerializer = (data: any): MenuAdminSerializer => {
  return {
    id: data.id,
    department: data.department,
    start_at: new Date(data.start_at),
    end_at: new Date(data.end_at),
    appointment_id: data.appointment_id,
  };
};
