export async function apiGetCoursesInSemester(
  allCoursesUseRef: { [courseCode: string]: string[] },
  firstSemesterCode: string,
  currentSemesterCode: string,
  setLoading: (loading: boolean) => void
) {
  const timeIntervalStart =
    firstSemesterCode.slice(-1) === "h"
      ? "20" + firstSemesterCode.slice(0, 2) + "-07-15"
      : "20" + firstSemesterCode.slice(0, 2) + "-01-01";

  const timeIntervalEnd =
    currentSemesterCode.slice(-1) === "h"
      ? "20" + currentSemesterCode.slice(0, 2) + "-12-31"
      : "20" + currentSemesterCode.slice(0, 2) + "-07-01";

  try {
    const request =
      "https://data.uio.no/studies/v1/semesters/timeinterval/" +
      timeIntervalStart +
      "/" +
      timeIntervalEnd +
      "/courses";
    const response = await fetch(request);
    const data = await response.json();

    data.courses.forEach(
      (course: { code: string; name: string; semesterId: string }) => {
        if (
          course.code in allCoursesUseRef &&
          !allCoursesUseRef[course.code].includes(course.semesterId)
        ) {
          allCoursesUseRef[course.code].unshift(course.semesterId);
        } else {
          allCoursesUseRef[course.code] = [course.semesterId];
        }
      }
    );

    setLoading(false);
  } catch (error) {
    console.error(error);
  }
}
