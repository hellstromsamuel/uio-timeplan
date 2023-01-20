import CourseEvent from "../interfaces/CourseEvent";

export async function apiGetCourseSchedule(
  baseUrl: string,
  semesterCode: string | undefined,
  courseCode: string | null,
  setResponse: (events: CourseEvent[]) => void
) {
  try {
    const request =
      baseUrl + courseCode + "/semester/" + semesterCode + "/schedule";
    const response = await fetch(request);
    const data = await response.json();
    setResponse(data.events);
  } catch (error) {
    console.error(error);
  }
}
