import { FC } from "react";
import CourseEvent from "../../../../uio-api/interfaces/CourseEvent";
import { CalenderEventListComponent } from "./CalenderEventListComponent";

interface CalendarListComponentProps {
  allCourseEventsMap: Map<string, CourseEvent[]>;
}

export const CalendarListComponent: FC<CalendarListComponentProps> = ({
  allCourseEventsMap,
}) => {
  const allCourseEventsMapAsArray = Array.from(allCourseEventsMap)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => (a.key > b.key ? 1 : b.key > a.key ? -1 : 0));

  return (
    <div className="CalenderListComponent">
      {allCourseEventsMapAsArray.map(
        (arrayKeyValue: { key: string; value: CourseEvent[] }) => {
          return (
            <div key={arrayKeyValue.key}>
              <p style={{ marginTop: "30px", fontSize: "18px" }}>
                {arrayKeyValue.value[0].weekday}{" "}
                {arrayKeyValue.key.split("T")[0]}
              </p>
              {arrayKeyValue.value.map((event, index) => (
                <CalenderEventListComponent key={index} courseEvent={event} />
              ))}
            </div>
          );
        }
      )}
    </div>
  );
};
