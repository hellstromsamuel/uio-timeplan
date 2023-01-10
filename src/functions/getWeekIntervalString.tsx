import { months } from "../components/general/months";

export const getWeekIntervalString = (weekInterval: Date[]) => {
  const weekStart = weekInterval[0];
  const weekEnd = weekInterval[weekInterval.length - 1];

  return weekStart.getMonth() === weekEnd.getMonth()
    ? weekStart.getDate() +
        ". - " +
        weekEnd.getDate() +
        ". " +
        months[weekEnd.getMonth()].slice(0, 3)
    : weekStart.getDate() +
        ". " +
        months[weekStart.getMonth()].slice(0, 3) +
        " - " +
        weekEnd.getDate() +
        ". " +
        months[weekEnd.getMonth()].slice(0, 3);
};
