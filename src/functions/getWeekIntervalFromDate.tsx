import { eachDayOfInterval, endOfWeek, getWeek } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";

export const getWeekIntervalFromDate = (date: Date) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  weekEnd.setDate(weekEnd.getDate() - 2);

  const weekInterval = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });
  weekInterval.forEach((date) => {
    date.setHours(date.getHours() + 12);
  });

  return {
    weekNumber: getWeek(weekStart),
    weekInterval: weekInterval,
  };
};
