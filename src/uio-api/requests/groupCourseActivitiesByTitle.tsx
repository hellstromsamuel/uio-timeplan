import { differenceInHours } from "date-fns";
import CourseActivityEvents from "../interfaces/CourseActivityEvents";
import CourseEvent from "../interfaces/CourseEvent";
import { RoomCourseEvent } from "../interfaces/RoomCourseEvent";

const weekdays = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

export const groupCourseActivitiesByTitle = (events: CourseEvent[]) => {
  const groupedCourseActivities: CourseActivityEvents[] = [];

  events.forEach((event: CourseEvent) => {
    const index = groupedCourseActivities.findIndex(
      (courseActivity) => courseActivity.activityTitle === event.activityTitle
    );

    const allRooms: RoomCourseEvent[] = [];
    event.rooms?.forEach((room) => {
      allRooms.push({
        buildingAcronym: room.buildingAcronym,
        buildingId: room.buildingId,
        buildingName: room.buildingName,
        buildingUrl: room.buildingUrl,
        roomAcronym: room.buildingAcronym,
        roomId: room.roomId,
        roomName: room.roomName,
        roomUrl: room.roomUrl,
      });
    });

    const courseEventObject = {
      dtStart: event.dtStart,
      dtEnd: event.dtEnd,
      durationHours:
        differenceInHours(new Date(event.dtEnd), new Date(event.dtStart)) + 1, // e.g: 14:15-16:00 = 2 hours
      kind: event.kind,
      title: event.title,
      weekday: weekdays[new Date(event.dtStart).getDay() - 1],
      resourcesText: event.resourcesText,
      rooms: allRooms,
    };

    if (index !== -1) {
      groupedCourseActivities[index].events.push(courseEventObject);
    } else {
      groupedCourseActivities.push({
        activityTitle: event.activityTitle,
        activityBlockType: event.activityBlockType,
        activitySelected: event.activityBlockType === "plenary" ? true : false,
        activityType: event.activityType,
        events: [],
      });
      groupedCourseActivities.at(-1)?.events.push(courseEventObject);
    }
  });

  // sort groupedCourseActivities by type
  groupedCourseActivities.sort((a, b) =>
    a.activityBlockType && b.activityBlockType
      ? b.activityBlockType.localeCompare(a.activityBlockType)
      : -1
  );

  return groupedCourseActivities;
};
