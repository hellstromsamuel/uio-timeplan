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

export const groupScheduleEventsByName = (events: CourseEvent[]) => {
  const courseSchedule: CourseActivityEvents[] = [];

  events.forEach((event: CourseEvent) => {
    const dateObject = new Date(event.dtStart);
    const weekday = weekdays[dateObject.getDay() - 1]; // getDay(): returns 0-6, sunday-saturday

    const index = courseSchedule.findIndex(
      (courseActivity) => courseActivity.activityTitle === event.activityTitle
    );

    if (index !== -1) {
      courseSchedule[index].events.push({
        dtStart: event.dtStart,
        dtEnd: event.dtEnd,
        kind: event.kind,
        title: event.title,
        weekday: weekday,
      });
    } else {
      courseSchedule.push({
        activityTitle: event.activityTitle,
        activityBlockType: event.activityBlockType,
        activitySelected: false,
        activityType: event.activityType,
        events: [],
      });
      courseSchedule.at(-1)?.events.push({
        dtStart: event.dtStart,
        dtEnd: event.dtEnd,
        kind: event.kind,
        title: event.title,
        weekday: weekday,
      });
    }
  });
  return courseSchedule;
};
