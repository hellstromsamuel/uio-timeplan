import { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Chip } from "@mui/material";
import { ColorPicker } from "./ColorPicker";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { ScheduleEventsGrouped } from "./Course/ScheduleEventsGrouped";

function hideKeyboardiOSSafari() {
  (document.activeElement as HTMLElement).blur();
  document.body.focus();
}

interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterCode: string | undefined;
  allSemesterCourses: string[];
  courseCode: string | null;
  setCourseCode: (courseCode: string | null) => void;
  selectedCourses: { code: string; color: string }[];
  setSelectedCourses: (courses: { code: string; color: string }[]) => void;
  courseActivities: CourseActivityEvents[];
  setCourseActivities: (events: CourseActivityEvents[]) => void;
}

export const DialogAddCourse: FC<FormDialogProps> = ({
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
      selectedCourses.push({ code: courseCode, color: colorCode });
      setCourseCode(null);
      setAutocompleteValue(null);
      setCourseActivities([]);
      setOpen(false);
    }
  };

  const semesterCodeToText = () => {
    if (semesterCode) {
      const semesterSeason = semesterCode.slice(-1);
      const semesterYear = parseInt(semesterCode.slice(0, 2));

      return semesterSeason === "h"
        ? "Høst 20" + semesterYear
        : "Vår 20" + semesterYear;
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>
        Legg til emne
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Semester <Chip label={semesterCodeToText()} />
        </DialogContentText>
        <div className="AutocompleteGrid">
          <p className="inputLabel">Velg emne</p>
          <Autocomplete
            options={allSemesterCourses}
            getOptionDisabled={(option) =>
              selectedCoursesArray.includes(option.split(" - ")[0])
            }
            value={autocompleteValue}
            onChange={(event: any, newValue: string | null) => {
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
                  marginBottom: "20px",
                  backgroundColor: colorCode,
                }}
                label={courseCode}
              ></Chip>
            </div>
          )}
          {courseActivities && (
            <div>
              <p className="inputLabel">Huk av aktiviteter</p>
              {/* TODO: group course activties */}
              <ScheduleEventsGrouped
                semesterCode={semesterCode}
                courseActivities={courseActivities}
              />
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
