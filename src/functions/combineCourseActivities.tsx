import CourseEvent from "../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";

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
            title: event.title,
            weekday: event.weekday,
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
