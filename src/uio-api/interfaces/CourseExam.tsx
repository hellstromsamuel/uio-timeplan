export interface CourseExam {
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
