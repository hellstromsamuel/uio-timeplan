import { FC, useEffect, useState } from "react";
import "../styles/CoursePage.css";
import { apiGetCoursesInSemester } from "../uio-api/requests/apiGetCoursesInSemester";
import { DialogAddCourse } from "./dialogs/DialogAddCourse";
import { Autocomplete, TextField } from "@mui/material";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { SelectedCoursesComponent } from "./SelectedCoursesComponent";
import { hideKeyboardiOSSafari } from "../functions/hideKeyboardiOSSafari";
import { getSemesterText } from "../functions/getSemesterText";

interface CoursePageProps {
  setLoading: (loading: boolean) => void;
  baseUrl: string;
  currentSemesterCode: string;
}

export const CoursePage: FC<CoursePageProps> = ({
  setLoading,
  baseUrl,
  currentSemesterCode,
}) => {
  const [allSemesterCourses, setAllSemesterCourses] = useState<string[]>([]);
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
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
    apiGetCoursesInSemester(
      setAllSemesterCourses,
      currentSemesterCode,
      setLoading
    );
  }, [currentSemesterCode, setLoading]);

  return (
    <div className="CoursePage">
      <div className="headerContainer">
        <h2 style={{ marginBottom: "15px" }}>
          {selectedCourses.length > 0
            ? "Legg til flere emner"
            : "Legg til emner"}
        </h2>
        <div className="inputContainer">
          <TextField
            disabled
            id="outlined-disabled"
            label={getSemesterText(currentSemesterCode)}
          />

          <Autocomplete
            className="Autocomplete"
            sx={{ border: "none", width: "100%" }}
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
              <TextField variant="outlined" {...params} label="Søk i emner" />
            )}
          />
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <SelectedCoursesComponent
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
        />
      )}

      {openDialogAddCourse && courseCode && (
        <DialogAddCourse
          baseUrl={baseUrl}
          open={openDialogAddCourse}
          setOpen={setOpenDialogAddCourse}
          semesterCode={currentSemesterCode}
          allSemesterCourses={allSemesterCourses}
          courseCode={courseCode}
          setCourseCode={setCourseCode}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          courseActivities={courseActivities}
          setCourseActivities={setCourseActivities}
          autocompleteValue={autocompleteValue}
          setAutocompleteValue={setAutocompleteValue}
        />
      )}
    </div>
  );
};
