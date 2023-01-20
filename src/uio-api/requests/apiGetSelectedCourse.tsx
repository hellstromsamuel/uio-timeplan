import { SelectedCourse } from "../interfaces/SelectedCourse";
import { groupCourseActivitiesByTitle } from "./groupCourseActivitiesByTitle";

export async function apiGetSelectedCourse(
  baseUrl: string,
  semesterCode: string,
  course: {
    code: string;
    color: string;
    selectedCourseActivities: {
      activityTitle: string;
    }[];
  },
  selectedCourses: SelectedCourse[]
) {
  const response = await fetch(
    baseUrl + course.code + "/semester/" + semesterCode + "/schedule"
  );
  const data = await response.json();
  const groupedCourseActivities = groupCourseActivitiesByTitle(data.events);

  const selectedTitles = course.selectedCourseActivities.map(
    (activity) => activity.activityTitle
  );

  for (let i = 0; i < groupedCourseActivities.length; i++) {
    const title = groupedCourseActivities[i].activityTitle;
    if (title && selectedTitles.includes(title)) {
      groupedCourseActivities[i].activitySelected = true;
    }
  }

  if (!selectedCourses.some((selected) => selected.code === course.code)) {
    selectedCourses.push({
      code: course.code,
      color: course.color,
      courseActivities: groupedCourseActivities,
    });
  }
}
