export const getOpeningTime = (date: Date): Date => {
  const res = new Date();
  res.setDate(date.getDate());
  res.setHours(9);
  res.setMinutes(0);
  return res;
};

export const getMorningLastTime = (date: Date): Date => {
  const res = new Date();
  res.setDate(date.getDate());
  res.setHours(12);
  res.setMinutes(0);
  return res;
};

export const getAfternoonOpeningTime = (date: Date): Date => {
  const res = new Date();
  res.setDate(date.getDate());
  res.setHours(14);
  res.setMinutes(30);
  return res;
}

export const getLastTime = (date: Date): Date => {
  const res = new Date();
  res.setDate(date.getDate());
  res.setHours(17);
  res.setMinutes(0);
  return res;
};
