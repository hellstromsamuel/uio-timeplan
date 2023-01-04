import CourseExamProps from "./PropsUioApi";

export async function apiGetExamInfo(
  baseUrl: string,
  semesterCode: string | undefined,
  courseCode: string | null,
  setCourseExams: (exams: CourseExamProps[]) => void
) {
  try {
    const request =
      baseUrl + courseCode + "/semester/" + semesterCode + "/exam";
    const response = await fetch(request);
    const data = await response.json();
    setCourseExams(data.arrangements);
  } catch (error) {
    console.error(error);
  }
}
