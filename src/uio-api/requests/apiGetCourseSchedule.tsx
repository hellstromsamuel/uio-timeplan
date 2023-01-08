import { groupScheduleEventsByName } from "../../functions/groupScheduleEventsByName";
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
    const courseEventsGrouped = groupScheduleEventsByName(data.events);
    setCourseEvents(courseEventsGrouped);
  } catch (error) {
    console.error(error);
  }
}
