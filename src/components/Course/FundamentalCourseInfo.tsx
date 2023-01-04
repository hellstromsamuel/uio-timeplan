import { FC } from "react";
import CourseInfoProps from "../../uio-api/PropsUioApi";

interface FundamentalCourseInfoProps {
  courseInfo: CourseInfoProps | null;
}

export const FundamentalCourseInfo: FC<FundamentalCourseInfoProps> = ({
  courseInfo,
}) => {
  return (
    <div className="CourseItem">
      <h2>
        {courseInfo?.code} - {courseInfo?.name}
      </h2>
      <h3>Linker til UiO sine sider</h3>
      <a href={courseInfo?.courseUrl}>Emneside</a>
      <a href={courseInfo?.url}>Semesterside</a>
      <a href={courseInfo?.schedule}>Timeplan</a>
      <a href={courseInfo?.exam}>Eksamen</a>
    </div>
  );
};
