import CourseEvent from "../interfaces/CourseEvent";
import { SelectedCourse } from "../interfaces/SelectedCourse";

export const combineCourseActivities = (selectedCourses: SelectedCourse[]) => {
  const allCourseEventsMap = new Map<string, CourseEvent[]>(); // dateTime: [CourseEvents...]

  selectedCourses.forEach((course) => {
    course.courseActivities.forEach((activity) => {
      activity.events.forEach((event) => {
        if (activity.activitySelected) {
          const courseEvent = {
            courseCode: course.code,
            colorCode: course.color,
            activityBlockType: activity.activityBlockType,
            activityTitle: activity.activityTitle,
            activityType: activity.activityType,
            dtStart: event.dtStart,
            dtEnd: event.dtEnd,
            durationHours: event.durationHours,
            title: event.title,
            weekday: event.weekday,
            rooms: event.rooms,
          };
          if (allCourseEventsMap.has(event.dtStart.split(":")[0])) {
            allCourseEventsMap
              .get(event.dtStart.split(":")[0])
              ?.push(courseEvent);
          } else {
            allCourseEventsMap.set(event.dtStart.split(":")[0], [courseEvent]);
          }
        }
      });
    });
  });

  return allCourseEventsMap;
};
