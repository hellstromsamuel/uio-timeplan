import CourseEvent from "../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";

const compareCourseEventDate = (
  courseEventA: CourseEvent,
  courseEventB: CourseEvent
) => {
  if (courseEventA.dtStart < courseEventB.dtStart) {
    return -1;
  }
  if (courseEventA.dtStart > courseEventB.dtStart) {
    return 1;
  }
  return 0;
};

export const combineCourseActivities = (selectedCourses: SelectedCourse[]) => {
  const allCombinedCourseEvents: CourseEvent[] = [];

  selectedCourses.forEach((course) => {
    course.courseActivities.forEach((activity) => {
      activity.events.forEach((event) => {
        if (activity.activitySelected) {
          allCombinedCourseEvents.push({
            courseCode: course.code,
            colorCode: course.color,
            activityBlockType: activity.activityBlockType,
            activityTitle: activity.activityTitle,
            activityType: activity.activityType,
            dtStart: event.dtStart,
            dtEnd: event.dtEnd,
            title: event.title,
            weekday: event.weekday,
          });
        }
      });
    });
  });

  return allCombinedCourseEvents.sort(compareCourseEventDate);
};
