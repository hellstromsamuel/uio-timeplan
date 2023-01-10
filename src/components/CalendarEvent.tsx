import { FC } from "react";
import CourseEvent from "../uio-api/interfaces/CourseEvent";

interface CalendarEventProps {
  courseEvent: CourseEvent;
}

export const CalendarEvent: FC<CalendarEventProps> = ({ courseEvent }) => {
  return (
    <div
      style={{
        borderLeft: "4px solid " + courseEvent.colorCode,
      }}
      className="CalendarEvent"
    >
      <span>{courseEvent.dtStart.split("T")[1].slice(0, 5)}</span>
      <span>
        <strong>{courseEvent.activityTitle}</strong>
      </span>
    </div>
  );
};
