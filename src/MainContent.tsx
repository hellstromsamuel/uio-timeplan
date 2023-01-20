import { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import "./styles/CoursePage.css";
import { CircularProgress } from "@mui/material";
import { calculateCurrentSemesterCode } from "./functions/calculateCurrentSemesterCode";
import { HeaderComponent } from "./components/header/HeaderComponent";
import { apiGetCoursesInSemester } from "./uio-api/requests/apiGetCoursesInSemester";
import { SelectedCourse } from "./uio-api/interfaces/SelectedCourse";
import { ExamComponent } from "./components/selected-courses/ExamComponent";
import { CourseExam } from "./uio-api/interfaces/CourseExam";
import { ScheduleComponent } from "./components/selected-courses/ScheduleComponent";

const baseUrl = "https://data.uio.no/studies/v1/course/";
const currentSemesterCode = calculateCurrentSemesterCode();

export const MainContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allSemesterCourses, setAllSemesterCourses] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  const courseExams = useRef<CourseExam[]>([]);

  useEffect(() => {
    apiGetCoursesInSemester(
      setAllSemesterCourses,
      currentSemesterCode,
      setLoading
    );
  }, [setLoading]);

  return (
    <div className="MainContent">
      {loading ? (
        <div className="loadingContainer">
          <CircularProgress size={100} />
        </div>
      ) : (
        <div className="CoursePage">
          <HeaderComponent
            baseUrl={baseUrl}
            currentSemesterCode={currentSemesterCode}
            allSemesterCourses={allSemesterCourses}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />

          {selectedCourses.length > 0 && (
            <ScheduleComponent selectedCourses={selectedCourses} />
          )}
        </div>
      )}
    </div>
  );
};
