import CourseActivityEvents from "./CourseActivityEvents";

export interface SelectedCourse {
  code: string;
  color: string;
  courseActivities: CourseActivityEvents[];
}
