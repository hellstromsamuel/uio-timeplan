import { eachDayOfInterval, endOfWeek, getWeek } from "date-fns";

export const changeWeek = (
  setWeek: (week: { weekNumber: number; weekInterval: Date[] }) => void,
  direction: string,
  weekStart: Date
) => {
  const newWeekStart = weekStart;
  direction === "prev"
    ? newWeekStart.setDate(weekStart.getDate() - 7)
    : newWeekStart.setDate(weekStart.getDate() + 7);
  const newWeekEnd = endOfWeek(newWeekStart, { weekStartsOn: 1 });
  newWeekEnd.setDate(newWeekEnd.getDate() - 2);

  const weekInterval = eachDayOfInterval({
    start: newWeekStart,
    end: newWeekEnd,
  });
  weekInterval.forEach((date) => {
    date.setHours(date.getHours() + 12);
  });

  setWeek({
    weekNumber: getWeek(newWeekStart),
    weekInterval: weekInterval,
  });
};
