import { Edit } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CourseEvent from "../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { combineCourseActivities } from "../uio-api/requests/combineCourseActivities";
import { CalendarComponent } from "./selected-courses/schedule/CalendarComponent";
import { DialogEditCourse } from "./dialogs/DialogEditCourse";
import { MenuTabsComponent } from "./selected-courses/schedule/MenuTabsComponent";
import { CalendarListComponent } from "./selected-courses/schedule/list-view/CalendarListComponent";
import { ToggleButtonsCalendarView } from "./selected-courses/schedule/calendar-view/ToggleButtonsCalendarView";

interface SelectedCoursesComponentProps {
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (array: SelectedCourse[]) => void;
}

export const SelectedCoursesComponent: FC<SelectedCoursesComponentProps> = ({
  selectedCourses,
  setSelectedCourses,
}) => {
  const [openDialogEditCourse, setOpenDialogEditCourse] =
    useState<boolean>(false);
  const [selectedEditCourse, setSelectedEditCourse] = useState<SelectedCourse>(
    selectedCourses[0]
  );
  const [newColorCode, setNewColorCode] = useState<string>(
    selectedEditCourse.color
  );
  const [allCourseEventsMap, setAllCourseEventsMap] = useState<
    Map<string, CourseEvent[]>
  >(combineCourseActivities(selectedCourses));
  const [view, setView] = useState<string>("timeplan");

  useEffect(() => {
    console.log("SELECTED COURSES COMPONENT", selectedCourses);
    setAllCourseEventsMap(combineCourseActivities(selectedCourses));
  }, [selectedCourses]);

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
    <div className="selectedCoursesContainer">
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
      <Divider />

      <div className="CalendarContainer">
        <ToggleButtonsCalendarView view={view} setView={setView} />

        {view === "timeplan" && (
          <CalendarComponent allCourseEventsMap={allCourseEventsMap} />
        )}
        {view === "list" && (
          <CalendarListComponent allCourseEventsMap={allCourseEventsMap} />
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
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
        />
      )}
    </div>
  );
};
