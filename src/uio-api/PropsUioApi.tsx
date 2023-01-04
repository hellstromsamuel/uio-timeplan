export default interface CourseInfoProps {
  code: string;
  name: string;
  courseUrl: string;
  url: string;
  schedule: string;
  exam: string;
}

export default interface CourseExamProps {
  availableDate: string;
  availableTime: string;
  durationHours: number;
  name: string;
  evaluationArrangementName: string;
  examDate: string;
  examParts: {
    datasystem: string;
    durationHours: number;
    examDate: string;
    examTime: string;
    form: string;
    name: string;
  }[];
  examTime: string;
  form: string;
  status: string;
  submissionDueDate: string;
  submissionDueTime: string;
}

export default interface CourseEventsProps {
  activityBlockType: string;
  activityTitle: string;
  activityTypeName: string;
  dtStart: string;
  dtEnd: string;
  id: string;
}
