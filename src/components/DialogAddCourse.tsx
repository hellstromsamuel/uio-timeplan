import { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Schedule } from "./Course/Schedule";
import { Autocomplete, Chip } from "@mui/material";
import CourseEventsProps from "../uio-api/PropsUioApi";

function hideKeyboardiOSSafari() {
  (document.activeElement as HTMLElement).blur();
  document.body.focus();
}

interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterCode: string | undefined;
  allSemesterCourses: string[];
  setCourseCode: (courseCode: string | null) => void;
  selectedCourses: string[];
  setSelectedCourses: (courses: string[]) => void;
  courseEvents: CourseEventsProps[];
}

export const DialogAddCourse: FC<FormDialogProps> = ({
  open,
  setOpen,
  semesterCode,
  allSemesterCourses,
  setCourseCode,
  selectedCourses,
  setSelectedCourses,
  courseEvents,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    null
  );

  const addCourse = (selectedCourse: string | null) => {
    if (selectedCourse) {
      selectedCourses.length === 0
        ? setSelectedCourses([selectedCourse])
        : selectedCourses.push(selectedCourse);
      setCourseCode(null);
      setAutocompleteValue(null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
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
            {courseEvents.length > 0 && (
              <div>
                <p className="inputLabel">Huk av aktiviteter</p>
                <Schedule
                  semesterCode={semesterCode}
                  courseEvents={courseEvents}
                />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Lukk</Button>
          <Button
            disabled={autocompleteValue === null}
            variant={"contained"}
            onClick={handleClose}
          >
            Legg til emne
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
