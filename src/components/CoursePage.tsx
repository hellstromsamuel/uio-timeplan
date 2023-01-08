import { FC, useEffect, useState } from "react";
import "../styles/CoursePage.css";
import { SemesterToggleButtons } from "./SemesterToggleButtons";
import { apiGetCoursesInSemester } from "../uio-api/requests/apiGetCoursesInSemester";
import { DialogAddCourse } from "./DialogAddCourse";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { Launch, Search } from "@mui/icons-material";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { SelectedCoursesComponent } from "./SelectedCoursesComponent";

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
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  const [courseActivities, setCourseActivities] = useState<
    CourseActivityEvents[]
  >([]);

  const [openDialogAddCourse, setOpenDialogAddCourse] =
    useState<boolean>(false);

  useEffect(() => {
    setCourseCode(null);
    apiGetCoursesInSemester(setAllSemesterCourses, semesterCode, setLoading);
  }, [semesterCode, setLoading]);

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

        <p className="inputLabel">Velg semester</p>
        {/* TODO: Alert Dialog - when changing semester -> must lose prev selected courses */}
        <SemesterToggleButtons
          semesters={semesters}
          semesterCode={semesterCode}
          setSemesterCode={setSemesterCode}
        />

        <p className="inputLabel">Legg til emner</p>
        <Button
          sx={{
            width: "230px",
            fontSize: "16px",
            padding: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          variant="contained"
          endIcon={<Search />}
          onClick={() => setOpenDialogAddCourse(true)}
        >
          Søk etter emne
        </Button>

        <p style={{ fontWeight: "300" }} className="inputLabel">
          Eller trykk her for å se et eksempel
        </p>
        <Button
          sx={{
            width: "230px",
            fontSize: "16px",
            padding: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          variant="outlined"
          endIcon={<Launch />}
          onClick={() => setOpenDialogAddCourse(true)}
        >
          Prøv et eksempel
        </Button>
      </div>

      {selectedCourses.length > 0 && (
        <SelectedCoursesComponent selectedCourses={selectedCourses} />
      )}

      {openDialogAddCourse && (
        <DialogAddCourse
          baseUrl={baseUrl}
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
      )}
    </div>
  );
};
