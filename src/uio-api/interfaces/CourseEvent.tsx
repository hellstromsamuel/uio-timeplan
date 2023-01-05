export default interface CourseEvent {
  activityTitle?: string;
  activityBlockType?: string;
  dtStart: string;
  dtEnd: string;
  duration: string;
  kind: string;
  title: string;
  weeknumber: number;
  weekday: string;
}
