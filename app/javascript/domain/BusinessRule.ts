import { addDays, eachMinuteOfInterval } from "date-fns";

const getOpeningTime = (date: Date): Date => {
  const res = new Date(date);
  res.setHours(9);
  res.setMinutes(0);
  return res;
};

const getMorningLastTime = (date: Date): Date => {
  const res = new Date(date);
  res.setHours(12);
  res.setMinutes(0);
  return res;
};

const getAfternoonOpeningTime = (date: Date): Date => {
  const res = new Date(date);
  res.setHours(14);
  res.setMinutes(30);
  return res;
};

const getLastTime = (date: Date): Date => {
  const res = new Date(date);
  res.setHours(17);
  res.setMinutes(0);
  return res;
};

export function createDaysOnTheTime(baseDate: Date, count: number): Date[] {
  return eachMinuteOfInterval(
    { start: baseDate, end: addDays(baseDate, count) },
    { step: 24 * 60 }
  );
}

export function createBusinessTimesEveryThirtyMinutes(base: Date): Date[] {
  const interval = 30;
  return eachMinuteOfInterval(
    {
      start: getOpeningTime(base),
      end: getMorningLastTime(base),
    },
    { step: interval }
  ).concat(
    eachMinuteOfInterval(
      {
        start: getAfternoonOpeningTime(base),
        end: getLastTime(base),
      },
      { step: interval }
    )
  );
}
