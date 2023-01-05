import { FC, useEffect, useState } from "react";
import "../styles/CoursePage.css";
import { SemesterToggleButtons } from "./SemesterToggleButtons";
// import { apiGetExamInfo } from "../uio-api/requests/apiGetExamInfo";
// import { apiGetFundamentalCourseInfo } from "../uio-api/requests/apiGetFundamentalCourseInfo";
import { apiGetCourseSchedule } from "../uio-api/requests/apiGetCourseSchedule";
import { apiGetCoursesInSemester } from "../uio-api/requests/apiGetCoursesInSemester";
import { DialogAddCourse } from "./DialogAddCourse";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { AddTask } from "@mui/icons-material";
// import { CourseInfoProps } from "../uio-api/interfaces/CourseInfoProps";
// import { CourseExamProps } from "../uio-api/interfaces/CourseExamProps";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourses } from "./Course/SelectedCourses";

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
  const [selectedCourses, setSelectedCourses] = useState<
    { code: string; color: string }[]
  >([]);

  // const [courseInfo, setCourseInfo] = useState<CourseInfoProps | null>(null);
  // const [courseExams, setCourseExams] = useState<CourseExamProps[]>([]);
  const [courseActivities, setCourseActivities] = useState<
    CourseActivityEvents[]
  >([]);

  const [openDialogAddCourse, setOpenDialogAddCourse] =
    useState<boolean>(false);

  useEffect(() => {
    setCourseCode(null);
    apiGetCoursesInSemester(setAllSemesterCourses, semesterCode, setLoading);
  }, [semesterCode, setLoading]);

  useEffect(() => {
    if (courseCode) {
      // apiGetFundamentalCourseInfo(
      //   baseUrl,
      //   semesterCode,
      //   courseCode,
      //   setCourseInfo
      // );
      // apiGetExamInfo(baseUrl, semesterCode, courseCode, setCourseExams);
      apiGetCourseSchedule(
        baseUrl,
        semesterCode,
        courseCode,
        setCourseActivities
      );
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
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        courseActivities={courseActivities}
        setCourseActivities={setCourseActivities}
      />

      {selectedCourses.length > 0 && (
        <SelectedCourses selectedCourses={selectedCourses} />
      )}
    </div>
  );
};
