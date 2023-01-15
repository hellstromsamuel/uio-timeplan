import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip } from "@mui/material";
import { ColorPicker } from "../general/ColorPicker";
import CourseActivityEvents from "../../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { semesterCodeToText } from "../../functions/semsterCodeToText";
import { CheckboxCourseActivities } from "./CheckboxCourseActivities";
import { InfoOutlined } from "@mui/icons-material";
import { apiGetCourseSchedule } from "../../uio-api/requests/apiGetCourseSchedule";

interface DialogAddCourseProps {
  baseUrl: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterCode: string | undefined;
  allSemesterCourses: string[];
  courseCode: string | null;
  setCourseCode: (courseCode: string | null) => void;
  courseActivities: CourseActivityEvents[];
  setCourseActivities: (events: CourseActivityEvents[]) => void;
  autocompleteValue: string | null;
  setAutocompleteValue: (value: string | null) => void;
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (array: SelectedCourse[]) => void;
}

export const DialogAddCourse: FC<DialogAddCourseProps> = ({
  baseUrl,
  open,
  setOpen,
  semesterCode,
  courseCode,
  setCourseCode,
  courseActivities,
  setCourseActivities,
  autocompleteValue,
  setAutocompleteValue,
  selectedCourses,
  setSelectedCourses,
}) => {
  const [colorCode, setColorCode] = useState<string>("rgb(244, 67, 54, 0.5)");

  useEffect(() => {
    apiGetCourseSchedule(
      baseUrl,
      semesterCode,
      courseCode,
      setCourseActivities
    );
  }, [baseUrl, semesterCode, courseCode, setCourseActivities]);

  const closeDialog = () => {
    setCourseCode(null);
    setAutocompleteValue(null);
    setCourseActivities([]);
    setOpen(false);
  };

  const addCourse = () => {
    if (courseCode) {
      const newArray = [...selectedCourses];
      newArray.push({
        code: courseCode,
        color: colorCode,
        courseActivities: courseActivities,
      });
      setSelectedCourses(newArray);
      closeDialog();
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>
        {courseCode}
      </DialogTitle>
      <DialogContent>
        <Chip label={semesterCodeToText(semesterCode)} />
        <div className="DialogContentGrid">
          <p className="inputLabel">Velg fargekode</p>
          <ColorPicker colorCode={colorCode} setColorCode={setColorCode} />
          <Chip
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              backgroundColor: colorCode,
              fontSize: "15px",
              padding: "10px",
            }}
            label={courseCode}
          ></Chip>

          {courseActivities.length > 0 && (
            <CheckboxCourseActivities courseActivities={courseActivities} />
          )}
          {courseActivities.length === 0 && (
            <div>
              <p className="inputLabel">Ingen aktiviteter i timeplanen</p>
              <InfoOutlined color="error" />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Lukk</Button>
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
