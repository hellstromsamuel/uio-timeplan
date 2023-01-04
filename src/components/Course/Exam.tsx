import { FC } from "react";
import CourseExamProps from "../../uio-api/PropsUioApi";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

interface ExamProps {
  courseCode: string;
  courseExams: CourseExamProps[];
}

export const Exam: FC<ExamProps> = ({ courseCode, courseExams }) => {
  return (
    <div className="CourseItem">
      <h3>Eksamen</h3>
      {/* <Timeline position="left">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
      </Timeline> */}
      {courseExams?.map((exam) => {
        return (
          <div key={courseCode + exam.name + exam.status}>
            <strong>{exam.name}</strong>
            <table>
              <tbody>
                {exam.form && (
                  <tr>
                    <td>
                      <strong>Form</strong>
                    </td>
                    <td>{exam.form}</td>
                  </tr>
                )}
                {exam.status && (
                  <tr>
                    <td>
                      <strong>Status</strong>
                    </td>
                    <td>{exam.status}</td>
                  </tr>
                )}
                {exam.examDate && (
                  <tr>
                    <td>
                      <strong>Dato</strong>
                    </td>
                    <td>{exam.examDate}</td>
                  </tr>
                )}
                {exam.examTime && (
                  <tr>
                    <td>
                      <strong>Tidspunkt</strong>
                    </td>
                    <td>
                      {"Kl. "}
                      {exam.examTime.replace(":00.000", "")}
                    </td>
                  </tr>
                )}
                {exam.durationHours && !exam.availableDate && (
                  <tr>
                    <td>
                      <strong>Varighet</strong>
                    </td>
                    <td>{exam.durationHours} timer</td>
                  </tr>
                )}
                {exam.availableDate && (
                  <tr>
                    <td>
                      <strong>Utgitt</strong>
                    </td>
                    <td>
                      {exam.availableDate}
                      {" - Kl. "}
                      {exam.availableTime?.replace(":00.000", "")}
                    </td>
                  </tr>
                )}
                {exam.submissionDueDate && (
                  <tr>
                    <td>
                      <strong>Innleveringsfrist</strong>
                    </td>
                    <td>
                      {exam.submissionDueDate}
                      {" - Kl. "}
                      {exam.submissionDueTime?.replace(":00.000", "")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {exam.examParts && (
              <div>
                <p>
                  <strong>Deler av Eksamen</strong>
                </p>
                <ol>
                  {exam.examParts.map((part) => {
                    return (
                      <li key={part.form + part.name}>
                        <strong>{part.form}</strong>
                        {": "}
                        {part.name}
                        {part.examDate && (
                          <ul>
                            <li>
                              <strong>Dato</strong>
                              {": "}
                              {part.examDate}
                            </li>
                            <li>
                              <strong>Tidspunkt</strong>
                              {": Kl. "}
                              {part.examTime.replace(":00.000", "")}
                            </li>
                            <li>
                              <strong>Varighet</strong>
                              {": "}
                              {part.durationHours} timer
                            </li>
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
