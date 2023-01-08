import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Chip } from "@mui/material";
import { ColorPicker } from "./general/ColorPicker";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { semesterCodeToText } from "../functions/semsterCodeToText";
import { CheckboxCourseActivities } from "./CheckboxCourseActivities";
import { InfoOutlined } from "@mui/icons-material";
import { apiGetCourseSchedule } from "../uio-api/requests/apiGetCourseSchedule";

function hideKeyboardiOSSafari() {
  (document.activeElement as HTMLElement).blur();
  document.body.focus();
}

interface DialogAddCourseProps {
  baseUrl: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterCode: string | undefined;
  allSemesterCourses: string[];
  courseCode: string | null;
  setCourseCode: (courseCode: string | null) => void;
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (courses: SelectedCourse[]) => void;
  courseActivities: CourseActivityEvents[];
  setCourseActivities: (events: CourseActivityEvents[]) => void;
}

export const DialogAddCourse: FC<DialogAddCourseProps> = ({
  baseUrl,
  open,
  setOpen,
  semesterCode,
  allSemesterCourses,
  courseCode,
  setCourseCode,
  selectedCourses,
  setSelectedCourses,
  courseActivities,
  setCourseActivities,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    null
  );
  const [colorCode, setColorCode] = useState<string>("rgb(244, 67, 54, 0.5)");
  const selectedCoursesArray = selectedCourses.map(({ code }) => code);

  const addCourse = () => {
    if (courseCode) {
      selectedCourses.push({
        code: courseCode,
        color: colorCode,
        courseActivities: courseActivities,
      });
      setCourseCode(null);
      setAutocompleteValue(null);
      setCourseActivities([]);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (courseCode) {
      apiGetCourseSchedule(
        baseUrl,
        semesterCode,
        courseCode,
        setCourseActivities
      );
    }
  }, [baseUrl, semesterCode, courseCode, setCourseActivities]);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>
        Legg til emne
      </DialogTitle>
      <DialogContent>
        <Chip label={semesterCodeToText(semesterCode)} />

        <div className="AutocompleteGrid">
          <p className="inputLabel">Velg emne</p>
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
            }}
            renderInput={(params) => (
              <TextField {...params} label="Søk i emner" />
            )}
          />
          {courseCode && (
            <div>
              <p className="inputLabel">Velg fargekode</p>
              <ColorPicker colorCode={colorCode} setColorCode={setColorCode} />
              <Chip
                sx={{
                  marginTop: "10px",
                  backgroundColor: colorCode,
                }}
                label={courseCode}
              ></Chip>
            </div>
          )}

          {courseActivities.length > 0 && (
            <CheckboxCourseActivities courseActivities={courseActivities} />
          )}
          {courseCode && courseActivities.length === 0 && (
            <div>
              <p className="inputLabel">Ingen aktiviteter i timeplanen</p>
              <InfoOutlined color="error" />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Lukk</Button>
        <Button
          disabled={autocompleteValue === null}
          variant={"contained"}
          onClick={addCourse}
        >
          Legg til emne
        </Button>
      </DialogActions>
    </Dialog>
  );
};
