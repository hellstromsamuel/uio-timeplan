import { FC } from "react";

import CourseEventsProps from "../../uio-api/PropsUioApi";
import { AccordionComponent } from "../AccordionComponent";

interface ScheduleProps {
  semesterCode?: string;
  courseEvents: CourseEventsProps[];
}

export const Schedule: FC<ScheduleProps> = ({ semesterCode, courseEvents }) => {
  const semesterSeason = semesterCode?.slice(-1);
  const semesterYear = semesterCode?.slice(0, 2);

  return (
    <div className="CourseItem">
      <AccordionComponent
        summary={
          "Timeplan - " +
          (semesterSeason === "h"
            ? "Høst 20" + semesterYear
            : "Vår 20" + semesterYear)
        }
        content={
          <div>
            {courseEvents.map((event) => {
              return (
                <p key={event.id}>
                  <u>{event.activityTitle}</u> - {event.dtStart}
                </p>
              );
            })}
          </div>
        }
      />
    </div>
  );
};
