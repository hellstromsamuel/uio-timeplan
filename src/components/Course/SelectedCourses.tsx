import { Edit } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { DialogEditCourse } from "../DialogEditCourse";

interface SelectedCoursesProps {
  selectedCourses: { code: string; color: string }[];
}

export const SelectedCourses: FC<SelectedCoursesProps> = ({
  selectedCourses,
}) => {
  const [openDialogEditCourse, setOpenDialogEditCourse] =
    useState<boolean>(false);
  const [selectedEditCourse, setSelectedEditCourse] = useState<{
    index: number;
    course: { code: string; color: string };
  }>({ index: 0, course: selectedCourses[0] });
  const [newColorCode, setNewColorCode] = useState<string>(
    selectedEditCourse.course.color
  );

  useEffect(() => {
    console.log(selectedCourses);
  });

  const handleChipEdit = (index: number) => {
    setSelectedEditCourse({ index: index, course: selectedCourses[index] });
    setNewColorCode(selectedCourses[index].color); // show selected color in edit ColorPicker
    setOpenDialogEditCourse(true);
  };

  const changeColorSelectedCourse = (code: string, color: string) => {
    selectedCourses.forEach((course) => {
      if (course.code === code) course.color = color;
    });
  };

  const removeCourseFromSelectedList = (index: number) => {
    selectedCourses.splice(index, 1);
  };

  return (
    <div className="selectedCoursesContainer">
      <DialogEditCourse
        open={openDialogEditCourse}
        setOpen={setOpenDialogEditCourse}
        selectedEditCourse={selectedEditCourse}
        newColorCode={newColorCode}
        setNewColorCode={setNewColorCode}
        changeColorSelectedCourse={changeColorSelectedCourse}
        removeCourseFromSelectedList={removeCourseFromSelectedList}
      />
      <h2>Valgte emner</h2>
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
      {/* TODO: show combined schedule */}
    </div>
  );
};
