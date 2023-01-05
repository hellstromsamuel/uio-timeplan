import { FC } from "react";
import CourseEventActivity from "../../uio-api/interfaces/CourseActivityEvents";

interface ScheduleProps {
  semesterCode: string | undefined;
  courseActivities: CourseEventActivity[];
}

export const ScheduleEventsGrouped: FC<ScheduleProps> = ({
  semesterCode,
  courseActivities,
}) => {
  return (
    <div className="CourseItem">
      {courseActivities.map((activity) => {
        return <p>{activity.activityTitle}</p>;
      })}
    </div>
  );
};
