export async function apiGetCoursesInSemester(
  setAllSemesterCourses: (courses: string[]) => void,
  currentSemesterCode: string | undefined,
  setLoading: (loading: boolean) => void
) {
  try {
    const request =
      "https://data.uio.no/studies/v1/semester/" +
      currentSemesterCode +
      "/courses";
    const response = await fetch(request);
    const data = await response.json();

    const courses: string[] = [];
    data.courses.forEach((course: { code: string; name: string }) => {
      const courseFullName = course.code + " - " + course.name;
      if (!courses.includes(courseFullName)) {
        courses.push(courseFullName);
      }
    });

    setAllSemesterCourses(courses);
    setLoading(false); // end loading
  } catch (error) {
    console.error(error);
  }
}
