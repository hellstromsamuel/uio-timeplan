import CourseEvent from "./CourseEvent";

export default interface CourseActivityEvents {
  activityTitle: string | undefined;
  activityBlockType: string | undefined;
  activityType: string | undefined;
  events: CourseEvent[];
  activitySelected: boolean;
}
