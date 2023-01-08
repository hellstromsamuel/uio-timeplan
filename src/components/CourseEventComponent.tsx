import { Chip } from "@mui/material";
import { FC } from "react";
import CourseEvent from "../uio-api/interfaces/CourseEvent";

interface CourseEventComponentProps {
  courseEvent: CourseEvent;
}

export const CourseEventComponent: FC<CourseEventComponentProps> = ({
  courseEvent,
}) => {
  const startDate = courseEvent.dtStart.split("T");
  const endDate = courseEvent.dtEnd.split("T");

  const startTime = startDate[1].split(":00.")[0];
  const endTime = endDate[1].split(":00.")[0];

  return (
    <div className="CourseEventComponent">
      <Chip
        sx={{ backgroundColor: courseEvent.colorCode }}
        label={courseEvent.courseCode}
      />
      <span>{courseEvent.activityTitle}</span>
      <span></span>
      <span>
        Kl. {startTime} - {endTime}
      </span>
    </div>
  );
};
