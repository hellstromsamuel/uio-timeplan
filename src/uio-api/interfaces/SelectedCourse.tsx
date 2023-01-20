import CourseActivityEvents from "./CourseActivityEvents";
import { CourseExam } from "./CourseExam";

export interface SelectedCourse {
  code: string;
  color: string;
  courseActivities: CourseActivityEvents[];
  courseExams?: CourseExam[];
}
