import { RoomCourseEvent } from "./RoomCourseEvent";

export default interface CourseEvent {
  activityTitle?: string;
  activityBlockType?: string;
  activityType?: string;
  colorCode?: string;
  courseCode?: string;
  durationHours?: number;
  dtStart: string;
  dtEnd: string;
  kind?: string;
  title: string;
  weekday: string;
  rooms?: RoomCourseEvent[];
}
