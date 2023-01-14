import { startOfWeek } from "date-fns";

export const getStartOfWeekFromDate = (date: Date) => {
  const startOfWeekTodayDate = startOfWeek(date, { weekStartsOn: 1 });
  if (startOfWeekTodayDate.getHours() === 0) {
    startOfWeekTodayDate.setHours(startOfWeekTodayDate.getHours() + 12); // avoid time to be 00:00.000
  }
  return startOfWeekTodayDate.toISOString().split("T")[0];
};
