import { Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CourseEvent from "../../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { combineCourseActivities } from "../../uio-api/requests/combineCourseActivities";
import { CalendarComponent } from "./schedule/CalendarComponent";
import { CalendarListComponent } from "./schedule/list-view/CalendarListComponent";
import { ToggleButtonsCalendarView } from "./schedule/ToggleButtonsCalendarView";
import { SelectedCoursesMenuTabs } from "./SelectedCoursesMenuTabs";
import { ExamComponent } from "./ExamComponent";

interface SelectedCoursesComponentProps {
  selectedCourses: SelectedCourse[];
}

export const SelectedCoursesComponent: FC<SelectedCoursesComponentProps> = ({
  selectedCourses,
}) => {
  const [allCourseEventsMap, setAllCourseEventsMap] = useState<
    Map<string, CourseEvent[]>
  >(combineCourseActivities(selectedCourses));
  const [courseMenu, setCourseMenu] = useState<string>("schedule");

  useEffect(() => {
    console.log("SELECTED COURSES COMPONENT", selectedCourses);
    setAllCourseEventsMap(combineCourseActivities(selectedCourses));
  }, [selectedCourses, setAllCourseEventsMap]);

  return (
    <div className="selectedCoursesContainer">
      <SelectedCoursesMenuTabs setCourseMenu={setCourseMenu} />
      <Divider />

      {courseMenu === "schedule" && (
        <CalendarComponent allCourseEventsMap={allCourseEventsMap} />
      )}
      {courseMenu === "exams" && (
        <ExamComponent selectedCourses={selectedCourses} />
      )}
    </div>
  );
};
