import { FC } from "react";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { HeaderAddCourse } from "./HeaderAddCourse";
import { HeaderSelectedCoursesEdit } from "./HeaderSelectedCoursesEdit";

interface HeaderComponentProps {
  baseUrl: string;
  currentSemesterCode: string;
  allSemesterCourses: string[];
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (courses: SelectedCourse[]) => void;
}

export const HeaderComponent: FC<HeaderComponentProps> = ({
  baseUrl,
  currentSemesterCode,
  allSemesterCourses,
  selectedCourses,
  setSelectedCourses,
}) => {
  return (
    <div className="headerContainer">
      <HeaderAddCourse
        baseUrl={baseUrl}
        currentSemesterCode={currentSemesterCode}
        allSemesterCourses={allSemesterCourses}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />

      <HeaderSelectedCoursesEdit
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />
    </div>
  );
};
