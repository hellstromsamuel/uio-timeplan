import { Edit } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { DialogEditCourse } from "../dialogs/DialogEditCourse";

interface HeaderSelectedCoursesEditProps {
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (courses: SelectedCourse[]) => void;
}

export const HeaderSelectedCoursesEdit: FC<HeaderSelectedCoursesEditProps> = ({
  selectedCourses,
  setSelectedCourses,
}) => {
  const [selectedEditCourse, setSelectedEditCourse] =
    useState<SelectedCourse | null>(null);
  const [newColorCode, setNewColorCode] = useState<string | null>(null);

  const [openDialogEditCourse, setOpenDialogEditCourse] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedCourses.length > 0 && !selectedEditCourse && !newColorCode) {
      setSelectedEditCourse(selectedCourses[0]);
      setNewColorCode(selectedCourses[0].color);
    }
  }, [selectedCourses, newColorCode, selectedEditCourse]);

  const handleChipEdit = (index: number) => {
    setSelectedEditCourse(selectedCourses[index]);
    setNewColorCode(selectedCourses[index].color); // show selected color in edit ColorPicker
    setOpenDialogEditCourse(true);
  };

  const changeColorSelectedCourse = (code: string, color: string) => {
    const index = selectedCourses.findIndex((course) => course.code === code);
    if (index !== -1) {
      selectedCourses[index].color = color;
    }
    setSelectedCourses([...selectedCourses]);
  };

  return (
    <div>
      {" "}
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
