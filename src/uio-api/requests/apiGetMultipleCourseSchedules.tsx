import { SelectedCourse } from "../interfaces/SelectedCourse";
import { groupCourseActivitiesByTitle } from "./groupCourseActivitiesByTitle";

export async function apiGetMultipleCourseSchedules(
  baseUrl: string,
  semesterCode: string,
  userSelectedCourses: {
    code: string;
    color: string;
    selectedCourseActivities: {
      activityTitle: string;
    }[];
  }[],
  setSelectedCourses: (courses: SelectedCourse[]) => void
) {
  const requests = userSelectedCourses.map((course) =>
    fetch(baseUrl + course.code + "/semester/" + semesterCode + "/schedule")
  );
  Promise.all(requests)
    .then((values) => {
      return Promise.all(values.map((response) => response.json()));
    })
    .then((data) => {
      const savedSelectedCourses: SelectedCourse[] = [];

      for (let i = 0; i < userSelectedCourses.length; i++) {
        const groupedCourseActivities = groupCourseActivitiesByTitle(
          data[i].events
        );
        const selectedTitles = userSelectedCourses[
          i
        ].selectedCourseActivities.map((activity) => activity.activityTitle);
        for (let i = 0; i < groupedCourseActivities.length; i++) {
          const title = groupedCourseActivities[i].activityTitle;
          if (title && selectedTitles.includes(title)) {
            groupedCourseActivities[i].activitySelected = true;
          }
        }
        savedSelectedCourses.push({
          code: userSelectedCourses[i].code,
          color: userSelectedCourses[i].color,
          courseActivities: groupedCourseActivities,
        });
      }
      setSelectedCourses(savedSelectedCourses);
    });
}
