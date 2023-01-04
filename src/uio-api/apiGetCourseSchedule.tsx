import CourseEventsProps from "./PropsUioApi";

export async function apiGetCourseSchedule(
  baseUrl: string,
  semesterCode: string | undefined,
  courseCode: string | null,
  setCourseEvents: (events: CourseEventsProps[]) => void
) {
  try {
    const request =
      baseUrl + courseCode + "/semester/" + semesterCode + "/schedule";
    const response = await fetch(request);
    const data = await response.json();
    setCourseEvents(data.events);
  } catch (error) {
    console.error(error);
  }
}
