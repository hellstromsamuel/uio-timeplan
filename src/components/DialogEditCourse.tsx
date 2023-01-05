import { Button, Chip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { ColorPicker } from "./ColorPicker";

interface DialogEditCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedEditCourse: {
    index: number;
    course: { code: string; color: string };
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
      </DialogContent>
      <DialogActions>
        <Button color="error" variant={"contained"} onClick={removeCourse}>
          Fjern emne
        </Button>
        <Button variant={"contained"} onClick={saveCourseChanges}>
          Lagre endringer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
