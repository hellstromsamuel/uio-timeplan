import CourseInfoProps from "./PropsUioApi";

function addCourseUrl(fullUrl: string) {
  const courseUrl = fullUrl.split("/");
  courseUrl.splice(courseUrl.length - 2, 2);
  return courseUrl.join("/");
}

export async function apiGetFundamentalCourseInfo(
  baseUrl: string,
  semesterCode: string | undefined,
  courseCode: string | null,
  setCourseInfo: (courseInfo: CourseInfoProps) => void
) {
  if (courseCode) {
    try {
      const request = baseUrl + courseCode + "/semester/" + semesterCode;
      const response = await fetch(request);
      const data = await response.json();
      data.info.courseUrl = addCourseUrl(data.info.url);
      setCourseInfo(data.info);
    } catch (error) {
      console.log(error);
    }
  }
}
