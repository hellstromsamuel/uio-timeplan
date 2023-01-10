import { FC } from "react";
import { combineCourseActivities } from "../functions/combineCourseActivities";
import CourseEvent from "../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { CourseEventComponent } from "./CourseEventComponent";

interface EventsListComponentProps {
  selectedCourses: SelectedCourse[];
}

export const EventsListComponent: FC<EventsListComponentProps> = ({
  selectedCourses,
}) => {
  const allCourseEventsMap = combineCourseActivities(selectedCourses);

  const allCourseEventsMapAsArray = Array.from(allCourseEventsMap)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => (a.key > b.key ? 1 : b.key > a.key ? -1 : 0));

  return (
    <div>
      {allCourseEventsMapAsArray.map(
        (arrayKeyValue: { key: string; value: CourseEvent[] }) => {
          return (
            <div key={arrayKeyValue.key}>
              <p style={{ marginTop: "30px", fontSize: "18px" }}>
                {arrayKeyValue.value[0].weekday}{" "}
                {arrayKeyValue.key.split("T")[0]}
              </p>
              {arrayKeyValue.value.map((event, index) => (
                <CourseEventComponent key={index} courseEvent={event} />
              ))}
            </div>
          );
        }
      )}
    </div>
  );
};
