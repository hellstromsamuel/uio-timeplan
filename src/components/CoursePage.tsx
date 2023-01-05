import { FC, useEffect, useState, useRef } from "react";
import { Exam } from "./Course/Exam";
import { Schedule } from "./Course/Schedule";
import { FundamentalCourseInfo } from "./Course/FundamentalCourseInfo";
import "../styles/CoursePage.css";
import { SemesterToggleButtons } from "./SemesterToggleButtons";
import CourseInfoProps from "../uio-api/PropsUioApi";
import CourseExamProps from "../uio-api/PropsUioApi";
import CourseEventsProps from "../uio-api/PropsUioApi";

import Alert from "@mui/material/Alert";
import { apiGetExamInfo } from "../uio-api/apiGetExamInfo";
import { apiGetFundamentalCourseInfo } from "../uio-api/apiGetFundamentalCourseInfo";
import { apiGetCourseSchedule } from "../uio-api/apiGetCourseSchedule";
import { Button } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { apiGetCoursesInSemester } from "../uio-api/apiGetCoursesInSemester";
import { DialogAddCourse } from "./DialogAddCourse";

interface CoursePageProps {
  setLoading: (loading: boolean) => void;
  baseUrl: string;
  currentSemesterCode: string;
  semesters: { value: string; text: string }[];
}

export const CoursePage: FC<CoursePageProps> = ({
  setLoading,
  baseUrl,
  currentSemesterCode,
  semesters,
}) => {
  const [allSemesterCourses, setAllSemesterCourses] = useState<string[]>([]);
  const [courseCode, setCourseCode] = useState<string | null>(null);

  const [semesterCode, setSemesterCode] = useState<string | undefined>(
    currentSemesterCode
  );
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseInfoProps | null>(null);
  const [courseExams, setCourseExams] = useState<CourseExamProps[]>([]);
  const [courseEvents, setCourseEvents] = useState<CourseEventsProps[]>([]);
  const [openDialogAddCourse, setOpenDialogAddCourse] =
    useState<boolean>(false);

  useEffect(() => {
    setCourseCode(null);
    apiGetCoursesInSemester(setAllSemesterCourses, semesterCode, setLoading);
  }, [, semesterCode]);

  useEffect(() => {
    if (courseCode) {
      apiGetFundamentalCourseInfo(
        baseUrl,
        semesterCode,
        courseCode,
        setCourseInfo
      );
      apiGetExamInfo(baseUrl, semesterCode, courseCode, setCourseExams);
      apiGetCourseSchedule(baseUrl, semesterCode, courseCode, setCourseEvents);
    }
  }, [baseUrl, semesterCode, courseCode]);

  return (
    <div className="CoursePage">
      <div className="inputContainer">
        <Alert severity="info">
          <ol style={{ margin: "0", fontSize: "16px" }}>
            <li>Velg semester</li>
            <li>Legg til emner</li>
            <li>Huk av aktiviteter</li>
            <li>
              <strong>Se resultatet under</strong>
            </li>
          </ol>
        </Alert>
        <div></div>

        <div>
          <p className="inputLabel">Velg semester</p>
          {/* TODO: Alert Dialog - when changing semester -> must lose prev selected courses */}
          <SemesterToggleButtons
            semesters={semesters}
            semesterCode={semesterCode}
            setSemesterCode={setSemesterCode}
          />
        </div>

        <Button
          sx={{
            width: "220px",
            marginTop: "10px",
            fontSize: "16px",
            padding: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          variant="contained"
          endIcon={<AddTask />}
          onClick={() => setOpenDialogAddCourse(true)}
        >
          Legg til emne
        </Button>
      </div>

      <DialogAddCourse
        open={openDialogAddCourse}
        setOpen={setOpenDialogAddCourse}
        semesterCode={semesterCode}
        allSemesterCourses={allSemesterCourses}
        setCourseCode={setCourseCode}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        courseEvents={courseEvents}
      />

      {selectedCourses.length > 0 && (
        <div className="selectedCoursesContainer">
          <h2>Valgte emner</h2>
          {selectedCourses.map((course) => {
            return <p>{course}</p>;
          })}
        </div>
      )}
    </div>
  );
};
