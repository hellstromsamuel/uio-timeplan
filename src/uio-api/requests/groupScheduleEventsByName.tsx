import { differenceInHours } from "date-fns";
import CourseActivityEvents from "../interfaces/CourseActivityEvents";
import CourseEvent from "../interfaces/CourseEvent";

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
    const index = courseSchedule.findIndex(
      (courseActivity) => courseActivity.activityTitle === event.activityTitle
    );

    const courseEventObject = {
      dtStart: event.dtStart,
      dtEnd: event.dtEnd,
      durationHours:
        differenceInHours(new Date(event.dtEnd), new Date(event.dtStart)) + 1, // e.g: 14:15-16:00 = 2 hours
      kind: event.kind,
      title: event.title,
      weekday: weekdays[new Date(event.dtStart).getDay() - 1],
    };

    if (index !== -1) {
      courseSchedule[index].events.push(courseEventObject);
    } else {
      courseSchedule.push({
        activityTitle: event.activityTitle,
        activityBlockType: event.activityBlockType,
        activitySelected: false,
        activityType: event.activityType,
        events: [],
      });
      courseSchedule.at(-1)?.events.push(courseEventObject);
    }
  });
  return courseSchedule;
};
