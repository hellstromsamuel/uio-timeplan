import { InfoOutlined } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { CheckboxCourseActivities } from "./CheckboxCourseActivities";
import { ColorPicker } from "./general/ColorPicker";

interface DialogEditCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedEditCourse: {
    index: number;
    course: SelectedCourse;
  };
  newColorCode: string;
  setNewColorCode: (color: string) => void;
  changeColorSelectedCourse: (code: string, color: string) => void;
  removeCourseFromSelectedList: (index: number) => void;
}

export const DialogEditCourse: FC<DialogEditCourseProps> = ({
  open,
  setOpen,
  selectedEditCourse,
  newColorCode,
  setNewColorCode,
  changeColorSelectedCourse,
  removeCourseFromSelectedList,
}) => {
  const saveCourseChanges = () => {
    changeColorSelectedCourse(selectedEditCourse.course.code, newColorCode);
    setOpen(false);
    console.log("SAVED");
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
    removeCourseFromSelectedList(selectedEditCourse.index);
    setOpen(false);
    console.log("REMOVED");
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>
        {selectedEditCourse.course.code}
      </DialogTitle>
      <DialogContent>
        <p className="inputLabel">Velg fargekode</p>
        <ColorPicker colorCode={newColorCode} setColorCode={setNewColorCode} />
        <Chip
          sx={{
            marginTop: "10px",
            marginBottom: "20px",
            backgroundColor: newColorCode,
          }}
          label={selectedEditCourse.course.code}
        ></Chip>
        {selectedEditCourse.course.courseActivities.length > 0 ? (
          <CheckboxCourseActivities
            courseActivities={selectedEditCourse.course.courseActivities}
            checkedArray={getCheckedArray(
              selectedEditCourse.course.courseActivities
            )}
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
