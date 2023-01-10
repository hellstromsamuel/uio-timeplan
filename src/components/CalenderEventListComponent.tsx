import { Chip } from "@mui/material";
import { FC } from "react";
import CourseEvent from "../uio-api/interfaces/CourseEvent";

interface CalenderEventListComponentProps {
  courseEvent: CourseEvent;
}

export const CalenderEventListComponent: FC<
  CalenderEventListComponentProps
> = ({ courseEvent }) => {
  const startDate = courseEvent.dtStart.split("T");
  const startTime = startDate[1].split(":00.")[0];

  return (
    <div className="CourseEventComponent">
      <Chip
        sx={{ backgroundColor: courseEvent.colorCode }}
        label={courseEvent.courseCode}
      />
      <span>{courseEvent.activityTitle}</span>
      <span></span>
      <span>Kl. {startTime}</span>
    </div>
  );
};
