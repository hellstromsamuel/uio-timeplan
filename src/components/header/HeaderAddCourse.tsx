import { Autocomplete, TextField } from "@mui/material";
import { FC, useState } from "react";
import { getSemesterText } from "../../functions/getSemesterText";
import { hideKeyboardiOSSafari } from "../../functions/hideKeyboardiOSSafari";
import CourseActivityEvents from "../../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { DialogAddCourse } from "../dialogs/DialogAddCourse";

interface HeaderAddCourseProps {
  baseUrl: string;
  currentSemesterCode: string;
  allSemesterCourses: string[];
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (courses: SelectedCourse[]) => void;
}

export const HeaderAddCourse: FC<HeaderAddCourseProps> = ({
  baseUrl,
  currentSemesterCode,
  allSemesterCourses,
  selectedCourses,
  setSelectedCourses,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    null
  );
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [courseActivities, setCourseActivities] = useState<
    CourseActivityEvents[]
  >([]);
  const [openDialogAddCourse, setOpenDialogAddCourse] =
    useState<boolean>(false);
  const selectedCoursesArray = selectedCourses.map(({ code }) => code);

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>
        {selectedCourses.length > 0 ? "Legg til flere emner" : "Legg til emner"}
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
