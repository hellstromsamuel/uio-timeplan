import { FC, useEffect, useState } from "react";
import "../styles/CoursePage.css";
import { SemesterToggleButtons } from "./SemesterToggleButtons";
import { apiGetCoursesInSemester } from "../uio-api/requests/apiGetCoursesInSemester";
import { DialogAddCourse } from "./DialogAddCourse";
import Alert from "@mui/material/Alert";
import { Autocomplete, TextField } from "@mui/material";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { SelectedCoursesComponent } from "./SelectedCoursesComponent";
import { hideKeyboardiOSSafari } from "../functions/hideKeyboardiOSSafari";

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
  const [selectedCourses] = useState<SelectedCourse[]>([]);
  const [courseActivities, setCourseActivities] = useState<
    CourseActivityEvents[]
  >([]);

  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    null
  );
  const selectedCoursesArray = selectedCourses.map(({ code }) => code);

  const [openDialogAddCourse, setOpenDialogAddCourse] =
    useState<boolean>(false);

  useEffect(() => {
    setCourseCode(null);
    apiGetCoursesInSemester(setAllSemesterCourses, semesterCode, setLoading);
  }, [semesterCode, setLoading]);

  return (
    <div className="CoursePage">
      <div className="headerContainer">
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

        <div className="inputContainer">
          <p className="inputLabel">Velg semester</p>
          {/* TODO: Alert Dialog - when changing semester -> must remove prev selected courses */}
          <SemesterToggleButtons
            semesters={semesters}
            semesterCode={semesterCode}
            setSemesterCode={setSemesterCode}
          />

          <p style={{ marginBottom: "15px" }} className="inputLabel">
            Legg til emner
          </p>
          <Autocomplete
            options={allSemesterCourses}
            getOptionDisabled={(option) =>
              selectedCoursesArray.includes(option.split(" - ")[0])
            }
            value={autocompleteValue}
            onChange={(event: any, newValue: string | null) => {
              setCourseActivities([]);
              hideKeyboardiOSSafari();
              setAutocompleteValue(newValue);
              setCourseCode(newValue ? newValue.split(" - ")[0] : null); // only set courceCode
              newValue && setOpenDialogAddCourse(true);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Søk i emner" />
            )}
          />
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <SelectedCoursesComponent selectedCourses={selectedCourses} />
      )}

      {openDialogAddCourse && courseCode && (
        <DialogAddCourse
          baseUrl={baseUrl}
          open={openDialogAddCourse}
          setOpen={setOpenDialogAddCourse}
          semesterCode={semesterCode}
          allSemesterCourses={allSemesterCourses}
          courseCode={courseCode}
          setCourseCode={setCourseCode}
          selectedCourses={selectedCourses}
          courseActivities={courseActivities}
          setCourseActivities={setCourseActivities}
          autocompleteValue={autocompleteValue}
          setAutocompleteValue={setAutocompleteValue}
        />
      )}
    </div>
  );
};
