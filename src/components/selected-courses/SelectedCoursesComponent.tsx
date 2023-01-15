import { Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CourseEvent from "../../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { combineCourseActivities } from "../../uio-api/requests/combineCourseActivities";
import { CalendarComponent } from "./schedule/CalendarComponent";
import { CalendarListComponent } from "./schedule/list-view/CalendarListComponent";
import { ToggleButtonsCalendarView } from "./schedule/calendar-view/ToggleButtonsCalendarView";
import { CourseInfoMenuTabs } from "./schedule/CourseInfoMenuTabs";

interface SelectedCoursesComponentProps {
  selectedCourses: SelectedCourse[];
}

export const SelectedCoursesComponent: FC<SelectedCoursesComponentProps> = ({
  selectedCourses,
}) => {
  const [allCourseEventsMap, setAllCourseEventsMap] = useState<
    Map<string, CourseEvent[]>
  >(combineCourseActivities(selectedCourses));
  const [view, setView] = useState<string>("timeplan");

  useEffect(() => {
    console.log("SELECTED COURSES COMPONENT", selectedCourses);
    setAllCourseEventsMap(combineCourseActivities(selectedCourses));
  }, [selectedCourses]);

  return (
    <div className="selectedCoursesContainer">
      <CourseInfoMenuTabs />
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
    </div>
  );
};
