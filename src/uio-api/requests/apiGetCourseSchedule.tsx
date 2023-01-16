import { groupScheduleEventsByName } from "./groupScheduleEventsByName";
import CourseEventActivity from "../interfaces/CourseActivityEvents";

export async function apiGetCourseSchedule(
  baseUrl: string,
  semesterCode: string | undefined,
  courseCode: string | null,
  setCourseEvents: (events: CourseEventActivity[]) => void
) {
  try {
    const request =
      baseUrl + courseCode + "/semester/" + semesterCode + "/schedule";
    const response = await fetch(request);
    const data = await response.json();
    console.log("DATA:", data.events);
    const courseEventsGrouped = groupScheduleEventsByName(data.events);
    console.log(courseEventsGrouped);

    setCourseEvents(courseEventsGrouped);
  } catch (error) {
    console.error(error);
  }
}
