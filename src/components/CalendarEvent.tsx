import { FC } from "react";
import CourseEvent from "../uio-api/interfaces/CourseEvent";

interface CalendarEventProps {
  courseEvent: CourseEvent;
}

export const CalendarEvent: FC<CalendarEventProps> = ({ courseEvent }) => {
  return (
    <div
      style={{
        borderLeft: "4px solid " + courseEvent.colorCode?.slice(0, -4) + "1.0)",
        backgroundColor: courseEvent.colorCode?.slice(0, -4) + "0.15)",
      }}
      className="CalendarEvent"
    >
      <span>
        {courseEvent.dtStart.split("T")[1].slice(0, 5) +
          " - " +
          courseEvent.dtEnd.split("T")[1].slice(0, 5)}
      </span>
      <span>
        <strong>{courseEvent.courseCode}</strong>
      </span>
      <span>
        <strong>{courseEvent.activityTitle}</strong>
      </span>
    </div>
  );
};
