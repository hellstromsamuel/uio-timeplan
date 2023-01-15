import { InfoOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import CourseActivityEvents from "../../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { ColorPicker } from "../general/ColorPicker";
import { CheckboxCourseActivities } from "./CheckboxCourseActivities";

interface DialogEditCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedEditCourse: SelectedCourse | null;
  newColorCode: string | null;
  setNewColorCode: (color: string) => void;
  changeColorSelectedCourse: (code: string, color: string) => void;
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (array: SelectedCourse[]) => void;
}

export const DialogEditCourse: FC<DialogEditCourseProps> = ({
  open,
  setOpen,
  selectedEditCourse,
  newColorCode,
  setNewColorCode,
  changeColorSelectedCourse,
  selectedCourses,
  setSelectedCourses,
}) => {
  const saveCourseChanges = () => {
    if (selectedEditCourse && newColorCode) {
      changeColorSelectedCourse(selectedEditCourse.code, newColorCode);
      setOpen(false);
      console.log("SAVED");
    }
  };

  const getCheckedArray = (courseActivities: CourseActivityEvents[]) => {
    if (courseActivities) {
      const checkedArray = [];
      for (let i = 0; i < courseActivities.length; i++) {
        checkedArray[i] = courseActivities[i].activitySelected;
      }
      return checkedArray;
    }
  };

  const removeCourse = () => {
    if (selectedEditCourse) {
      console.log("OLD", selectedCourses);
      const index = selectedCourses.indexOf(selectedEditCourse);
      if (index !== -1) {
        selectedCourses.splice(index, 1);
      }
      console.log("NEW", [...selectedCourses]);
      setSelectedCourses([...selectedCourses]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>
        {selectedEditCourse?.code}
      </DialogTitle>
      <DialogContent>
        <p className="inputLabel">Velg fargekode</p>
        {newColorCode && (
          <ColorPicker
            colorCode={newColorCode}
            setColorCode={setNewColorCode}
          />
        )}
        <Chip
          sx={{
            marginTop: "10px",
            marginBottom: "20px",
            backgroundColor: newColorCode,
            fontSize: "15px",
            padding: "10px",
          }}
          label={selectedEditCourse?.code}
        ></Chip>
        {selectedEditCourse &&
        selectedEditCourse.courseActivities.length > 0 ? (
          <CheckboxCourseActivities
            courseActivities={selectedEditCourse.courseActivities}
            checkedArray={getCheckedArray(selectedEditCourse?.courseActivities)}
          />
        ) : (
          <div>
            <InfoOutlined color="error" />
            <p className="inputLabel">Ingen aktiviteter i timeplanen</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Lukk</Button>
        <Button color="error" variant={"contained"} onClick={removeCourse}>
          Fjern emne
        </Button>
        <Button variant={"contained"} onClick={saveCourseChanges}>
          Lagre
        </Button>
      </DialogActions>
    </Dialog>
  );
};
