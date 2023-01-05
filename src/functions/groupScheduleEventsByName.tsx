import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import CourseEvent from "../uio-api/interfaces/CourseEvent";

const weekdays = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

const getWeekNumber = (dateObject: Date) => {
  const firstDayOfYear = new Date(dateObject.getFullYear(), 0, 1);
  var diff = Math.abs(dateObject.getTime() - firstDayOfYear.getTime());
  var weeknumber = Math.ceil(diff / (1000 * 3600 * 24 * 7));
  return weeknumber;
};

export const groupScheduleEventsByName = (events: CourseEvent[]) => {
  const courseSchedule: CourseActivityEvents[] = [];

  events.forEach((event: CourseEvent) => {
    const dateObject = new Date(event.dtStart);
    const index = courseSchedule.findIndex(
      (courseActivity) => courseActivity.activityTitle === event.activityTitle
    );
    if (index !== -1) {
      courseSchedule[index].events.push({
        dtStart: event.dtStart,
        dtEnd: event.dtEnd,
        duration: "",
        kind: event.kind,
        title: event.title,
        weeknumber: getWeekNumber(dateObject),
        weekday: weekdays[dateObject.getDay()],
      });
    } else {
      courseSchedule.push({
        activityTitle: event.activityTitle,
        activityBlockType: event.activityBlockType,
        events: [],
      });
      courseSchedule.at(-1)?.events.push({
        dtStart: event.dtStart,
        dtEnd: event.dtEnd,
        duration: "",
        kind: event.kind,
        title: event.title,
        weeknumber: getWeekNumber(dateObject),
        weekday: weekdays[dateObject.getDay()],
      });
    }
  });
  return courseSchedule;
};
