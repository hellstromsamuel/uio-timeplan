import { Edit } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { combineCourseActivities } from "../functions/combineCourseActivities";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { CourseEventComponent } from "./CourseEventComponent";
import { DialogEditCourse } from "./DialogEditCourse";

interface SelectedCoursesComponentProps {
  selectedCourses: SelectedCourse[];
}

export const SelectedCoursesComponent: FC<SelectedCoursesComponentProps> = ({
  selectedCourses,
}) => {
  const [openDialogEditCourse, setOpenDialogEditCourse] =
    useState<boolean>(false);
  const [selectedEditCourse, setSelectedEditCourse] = useState<{
    index: number;
    course: SelectedCourse;
  }>({ index: 0, course: selectedCourses[0] });
  const [newColorCode, setNewColorCode] = useState<string>(
    selectedEditCourse.course.color
  );

  useEffect(() => {
    console.log("SELECTED", selectedCourses);
  }, [selectedCourses]);

  const handleChipEdit = (index: number) => {
    setSelectedEditCourse({ index: index, course: selectedCourses[index] });
    setNewColorCode(selectedCourses[index].color); // show selected color in edit ColorPicker
    setOpenDialogEditCourse(true);
  };

  const changeColorSelectedCourse = (code: string, color: string) => {
    selectedCourses.forEach((course) => {
      if (course.code === code) course.color = color;
    });
  };

  const removeCourseFromSelectedList = (index: number) => {
    selectedCourses.splice(index, 1);
  };

  let courseEventDate = "";

  return (
    <div className="selectedCoursesContainer">
      <h2>Valgte emner</h2>
      {selectedCourses.map((course, index) => {
        return (
          <Chip
            key={index}
            sx={{
              marginRight: "10px",
              marginBottom: "10px",
              backgroundColor: course.color,
            }}
            label={course.code}
            deleteIcon={<Edit />}
            onDelete={() => handleChipEdit(index)}
          />
        );
      })}

      <div>
        <h2>Kombinert timeplan</h2>
        {combineCourseActivities(selectedCourses).map((courseEvent, index) => {
          const date = courseEvent.dtStart.split("T")[0];
          const dateHeader = date !== courseEventDate ? true : false;
          if (dateHeader) courseEventDate = date;
          return (
            <div key={index}>
              {dateHeader && (
                <p style={{ marginTop: "30px", fontSize: "18px" }}>
                  {courseEvent.weekday + " - " + date}
                </p>
              )}
              <CourseEventComponent courseEvent={courseEvent} />
            </div>
          );
        })}
      </div>

      {openDialogEditCourse && (
        <DialogEditCourse
          open={openDialogEditCourse}
          setOpen={setOpenDialogEditCourse}
          selectedEditCourse={selectedEditCourse}
          newColorCode={newColorCode}
          setNewColorCode={setNewColorCode}
          changeColorSelectedCourse={changeColorSelectedCourse}
          removeCourseFromSelectedList={removeCourseFromSelectedList}
        />
      )}
    </div>
  );
};
