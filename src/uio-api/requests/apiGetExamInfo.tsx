import { CourseExam } from "../interfaces/CourseExam";
import { SelectedCourse } from "../interfaces/SelectedCourse";

export async function apiGetExamInfo(
  baseUrl: string,
  semesterCode: string | undefined,
  courseCode: string | null,
  selectedCourses: SelectedCourse[]
) {
  try {
    const request =
      baseUrl + courseCode + "/semester/" + semesterCode + "/exam";
    const response = await fetch(request);
    const data = await response.json();
    selectedCourses.forEach((selectedCourse) => {
      if (selectedCourse.code === courseCode) {
        selectedCourse.courseExams = data.arrangements;
      }
    });
  } catch (error) {
    console.error(error);
  }
}
