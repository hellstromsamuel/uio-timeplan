import { months } from "../components/general/months";

export const getDateAsString = (date: Date) => {
  return date.getDate() + ". " + months[date.getMonth()].slice(0, 3);
};
