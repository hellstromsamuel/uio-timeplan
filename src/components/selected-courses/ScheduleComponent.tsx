import { Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CourseEvent from "../../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { combineCourseActivities } from "../../uio-api/requests/combineCourseActivities";
import { CalendarComponent } from "./schedule/CalendarComponent";
import { CalendarListComponent } from "./schedule/list-view/CalendarListComponent";
import { ToggleButtonsCalendarView } from "./schedule/calendar-view/ToggleButtonsCalendarView";
import { SelectedCoursesMenuTabs } from "./SelectedCoursesMenuTabs";
import { ExamComponent } from "./ExamComponent";

interface SelectedCoursesComponentProps {
  selectedCourses: SelectedCourse[];
}

export const ScheduleComponent: FC<SelectedCoursesComponentProps> = ({
  selectedCourses,
}) => {
  const [allCourseEventsMap, setAllCourseEventsMap] = useState<
    Map<string, CourseEvent[]>
  >(combineCourseActivities(selectedCourses));
  const [view, setView] = useState<string>("kalender");
  const [courseMenu, setCourseMenu] = useState<string>("schedule");

  useEffect(() => {
    console.log("SELECTED COURSES COMPONENT", selectedCourses);
    setAllCourseEventsMap(combineCourseActivities(selectedCourses));
  }, [selectedCourses]);

  return (
    <div className="selectedCoursesContainer">
      <SelectedCoursesMenuTabs setCourseMenu={setCourseMenu} />
      <Divider />

      {courseMenu === "schedule" && (
        <div className="CalendarContainer">
          <ToggleButtonsCalendarView view={view} setView={setView} />

          {view === "kalender" && (
            <CalendarComponent allCourseEventsMap={allCourseEventsMap} />
          )}
          {view === "list" && (
            <CalendarListComponent allCourseEventsMap={allCourseEventsMap} />
          )}
          {view === "text" && <p>Ren tekst</p>}
        </div>
      )}
      {courseMenu === "exams" && (
        <ExamComponent selectedCourses={selectedCourses} />
      )}
    </div>
  );
};
