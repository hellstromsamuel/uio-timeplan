import { FC } from "react";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";

interface ExamProps {
  selectedCourses: SelectedCourse[];
}

export const ExamComponent: FC<ExamProps> = ({ selectedCourses }) => {
  return (
    <div>
      {selectedCourses.map((selectedCourse, index) => {
        return (
          <div key={index}>
            <h3>{selectedCourse.code}</h3>
            {selectedCourse.courseExams?.map((exam, index) => {
              return (
                <div key={exam.name + exam.status + index}>
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
      })}
    </div>
  );
};
