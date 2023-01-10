import { Delete, Edit } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { CalendarComponent } from "./CalendarComponent";
import { CalendarListComponent } from "./CalendarListComponent";
import { CalendarViewToggleButtons } from "./CalendarViewToggleButtons";
import { DialogEditCourse } from "./DialogEditCourse";
import { MenuTabsComponent } from "./general/MenuTabsComponent";

interface SelectedCoursesComponentProps {
  selectedCourses: SelectedCourse[];
}

export const SelectedCoursesComponent: FC<SelectedCoursesComponentProps> = ({
  selectedCourses,
}) => {
  const [openDialogEditCourse, setOpenDialogEditCourse] =
    useState<boolean>(false);
  const [selectedEditCourse, setSelectedEditCourse] = useState<{
    index: number;
    course: SelectedCourse;
  }>({ index: 0, course: selectedCourses[0] });
  const [newColorCode, setNewColorCode] = useState<string>(
    selectedEditCourse.course.color
  );
  const [view, setView] = useState<string>("calender");

  useEffect(() => {
    console.log("SELECTED", selectedCourses);
  }, [selectedCourses]);

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

      <MenuTabsComponent />
      <Divider sx={{ marginBottom: "20px" }} />

      <div className="CalendarContainer">
        <CalendarViewToggleButtons view={view} setView={setView} />

        {view === "calender" && (
          <CalendarComponent selectedCourses={selectedCourses} />
        )}
        {view === "list" && (
          <CalendarListComponent selectedCourses={selectedCourses} />
        )}
        {view === "text" && <p>Ren tekst</p>}
      </div>

      {openDialogEditCourse && (
        <DialogEditCourse
          open={openDialogEditCourse}
          setOpen={setOpenDialogEditCourse}
          selectedEditCourse={selectedEditCourse}
          newColorCode={newColorCode}
          setNewColorCode={setNewColorCode}
          changeColorSelectedCourse={changeColorSelectedCourse}
          removeCourseFromSelectedList={removeCourseFromSelectedList}
        />
      )}
    </div>
  );
};
