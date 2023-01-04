import { FC, useEffect, useState } from "react";
import { Exam } from "./Course/Exam";
import { Schedule } from "./Course/Schedule";
import { FundamentalCourseInfo } from "./Course/FundamentalCourseInfo";
import "../styles/CoursePage.css";
import { SemesterToggleButtons } from "./SemesterToggleButtons";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CourseInfoProps from "../uio-api/PropsUioApi";
import CourseExamProps from "../uio-api/PropsUioApi";
import CourseEventsProps from "../uio-api/PropsUioApi";

import Alert from "@mui/material/Alert";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { apiGetExamInfo } from "../uio-api/apiGetExamInfo";
import { apiGetFundamentalCourseInfo } from "../uio-api/apiGetFundamentalCourseInfo";
import { apiGetCourseSchedule } from "../uio-api/apiGetCourseSchedule";

function hideKeyboardiOSSafari() {
  (document.activeElement as HTMLElement).blur();
  document.body.focus();
}

const guideSteps = ["Funnet siden", "Finn emner", "Velg semester"];

interface CoursePageProps {
  allAvailableCourses: { [courseCode: string]: string[] };
  baseUrl: string;
  currentSemesterCode: string;
  allSemesters: { value: string; text: string }[];
}

export const CoursePage: FC<CoursePageProps> = ({
  allAvailableCourses,
  baseUrl,
  currentSemesterCode,
  allSemesters,
}) => {
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [semesterCode, setSemesterCode] = useState<string | undefined>(
    currentSemesterCode
  );
  const [courseInfo, setCourseInfo] = useState<CourseInfoProps | null>(null);
  const [courseExams, setCourseExams] = useState<CourseExamProps[]>([]);
  const [courseEvents, setCourseEvents] = useState<CourseEventsProps[]>([]);

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
    <div>
      <Stepper
        sx={{ marginTop: "30px", marginBottom: "30px" }}
        activeStep={courseCode ? 3 : 1}
      >
        {guideSteps.map((label) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            success?: boolean;
          } = {};

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Alert severity="info">Søk etter emner i feltet under</Alert>

      <div className="inputContainer">
        <p className="inputLabel">Finn emner</p>
        <Autocomplete
          sx={{ marginTop: "20px" }}
          options={Object.keys(allAvailableCourses)}
          value={courseCode}
          onChange={(event: any, newValue: string | null) => {
            hideKeyboardiOSSafari();
            setCourseCode(newValue);
            setSemesterCode(
              newValue ? allAvailableCourses[newValue].at(0) : semesterCode
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Søk i emner" />
          )}
        />
        {courseCode && (
          <div>
            <p className="inputLabel">Velg semester</p>
            <SemesterToggleButtons
              semesterCode={semesterCode}
              setSemesterCode={setSemesterCode}
              courseSemesters={
                courseCode ? allAvailableCourses[courseCode] : undefined
              }
            />
          </div>
        )}
      </div>

      {courseCode && (
        // TODO: Loading når man bytter emnekode
        <div>
          <hr></hr>
          <FundamentalCourseInfo courseInfo={courseInfo} />
          <Exam courseCode={courseCode} courseExams={courseExams} />
          <Schedule semesterCode={semesterCode} courseEvents={courseEvents} />
        </div>
      )}
    </div>
  );
};
