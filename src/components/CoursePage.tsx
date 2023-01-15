import { FC, useEffect, useState } from "react";
import "../styles/CoursePage.css";
import { apiGetCoursesInSemester } from "../uio-api/requests/apiGetCoursesInSemester";
import { DialogAddCourse } from "./dialogs/DialogAddCourse";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { SelectedCoursesComponent } from "./SelectedCoursesComponent";
import { hideKeyboardiOSSafari } from "../functions/hideKeyboardiOSSafari";
import { getSemesterText } from "../functions/getSemesterText";
import { Edit } from "@mui/icons-material";
import { DialogEditCourse } from "./dialogs/DialogEditCourse";

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

  /* --- Chip edit --- */
  const handleChipEdit = (index: number) => {
    setSelectedEditCourse(selectedCourses[index]);
    setNewColorCode(selectedCourses[index].color); // show selected color in edit ColorPicker
    setOpenDialogEditCourse(true);
  };

  const [openDialogEditCourse, setOpenDialogEditCourse] =
    useState<boolean>(false);
  const [selectedEditCourse, setSelectedEditCourse] =
    useState<SelectedCourse | null>(null);
  const [newColorCode, setNewColorCode] = useState<string | null>(null);

  const changeColorSelectedCourse = (code: string, color: string) => {
    const index = selectedCourses.findIndex((course) => course.code === code);
    if (index !== -1) {
      selectedCourses[index].color = color;
    }
    setSelectedCourses([...selectedCourses]);
  };

  useEffect(() => {
    if (selectedCourses.length > 0 && !selectedEditCourse && !newColorCode) {
      setSelectedEditCourse(selectedCourses[0]);
      setNewColorCode(selectedCourses[0].color);
    }
  }, [selectedCourses, newColorCode, selectedEditCourse]);
  /* --- --- */

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

        {selectedCourses.length > 0 && (
          <div>
            <h2>Endre valgte emner</h2>
            {selectedCourses.map((course, index) => {
              return (
                <Chip
                  key={index}
                  sx={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    backgroundColor: course.color,
                  }}
                  label={course.code}
                  deleteIcon={<Edit />}
                  onDelete={() => handleChipEdit(index)}
                />
              );
            })}
          </div>
        )}
      </div>

      {selectedCourses.length > 0 && (
        <SelectedCoursesComponent selectedCourses={selectedCourses} />
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

      {openDialogEditCourse && (
        <DialogEditCourse
          open={openDialogEditCourse}
          setOpen={setOpenDialogEditCourse}
          selectedEditCourse={selectedEditCourse}
          newColorCode={newColorCode}
          setNewColorCode={setNewColorCode}
          changeColorSelectedCourse={changeColorSelectedCourse}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
        />
      )}
    </div>
  );
};
