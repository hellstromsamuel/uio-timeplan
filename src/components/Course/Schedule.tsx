import { FC } from "react";

import CourseEventsProps from "../../uio-api/PropsUioApi";

interface ScheduleProps {
  semesterCode: string | undefined;
  courseEvents: CourseEventsProps[];
}

export const Schedule: FC<ScheduleProps> = ({ semesterCode, courseEvents }) => {
  const semesterSeason = semesterCode?.slice(-1);
  const semesterYear = semesterCode?.slice(0, 2);

  return (
    <div className="CourseItem">
      <p>
        <strong>
          {"Timeplan - " +
            (semesterSeason === "h"
              ? "Høst 20" + semesterYear
              : "Vår 20" + semesterYear)}
        </strong>
      </p>
      {courseEvents.map((event) => {
        return (
          <p key={event.id}>
            <u>{event.activityTitle}</u> - {event.dtStart}
          </p>
        );
      })}
    </div>
  );
};
