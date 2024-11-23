export type MenuSerializer = {
  id: number;
  department: string;
  start_at: Date;
  end_at: Date;
  isFilled: boolean;
};

export const castToMenuSerializer = (data: any): MenuSerializer => {
  return {
    id: data.id,
    department: data.department,
    start_at: new Date(data.start_at),
    end_at: new Date(data.end_at),
    isFilled: data.filled,
  };
};
