import { eachDayOfInterval, endOfWeek, getWeek } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";

export const getCurrentWeekInterval = () => {
  const date = new Date();
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  weekEnd.setDate(weekEnd.getDate() - 2);

  return {
    weekNumber: getWeek(weekStart),
    weekInterval: eachDayOfInterval({ start: weekStart, end: weekEnd }),
  };
};
