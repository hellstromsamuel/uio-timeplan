import { Autocomplete, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getSemesterText } from "../../functions/getSemesterText";
import { hideKeyboardiOSSafari } from "../../functions/hideKeyboardiOSSafari";
import CourseEvent from "../../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../../uio-api/interfaces/SelectedCourse";
import { apiGetMultipleCourseSchedules } from "../../uio-api/requests/apiGetMultipleCourseSchedules";
import { DialogAddCourse } from "../dialogs/DialogAddCourse";

const selectedCoursesSamuel = [
  {
    code: "IN1010",
    color: "rgb(139,195,74, 0.5)",
    selectedCourseActivities: [
      { activityTitle: "Fellesøvelser" },
      { activityTitle: "Gruppe 9 prosa" },
    ],
  },
  {
    code: "IN5160",
    color: "rgb(33,150,243, 0.5)",
    selectedCourseActivities: [
      { activityTitle: "Forelesninger" },
      { activityTitle: "Gruppe 1" },
    ],
  },
  {
    code: "IN5431",
    color: "rgb(255,152,0, 0.5)",
    selectedCourseActivities: [
      { activityTitle: "Forelesninger" },
      { activityTitle: "Gruppe" },
    ],
  },
  {
    code: "IN5000",
    color: "rgb(255,235,59, 0.5)",
    selectedCourseActivities: [
      { activityTitle: "Forelesninger" },
      { activityTitle: "Feedback sessions" },
    ],
  },
  {
    code: "IN5010",
    color: "rgb(244,67,54, 0.5)",
    selectedCourseActivities: [{ activityTitle: "Forelesninger" }],
  },
];

interface HeaderAddCourseProps {
  baseUrl: string;
  currentSemesterCode: string;
  allSemesterCourses: string[];
  selectedCourses: SelectedCourse[];
  setSelectedCourses: (courses: SelectedCourse[]) => void;
}

export const HeaderAddCourse: FC<HeaderAddCourseProps> = ({
  baseUrl,
  currentSemesterCode,
  allSemesterCourses,
  selectedCourses,
  setSelectedCourses,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    null
  );
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [apiCourseSchedule, setApiCourseSchedule] = useState<CourseEvent[]>([]);

  const [openDialogAddCourse, setOpenDialogAddCourse] =
    useState<boolean>(false);
  const selectedCoursesArray = selectedCourses.map(({ code }) => code);

  // selectedCoursesSamuel : example from a user
  // when getting the user's selected courses from a database:
  useEffect(() => {
    apiGetMultipleCourseSchedules(
      baseUrl,
      currentSemesterCode,
      selectedCoursesSamuel,
      setSelectedCourses
    );
  }, [baseUrl, currentSemesterCode, setSelectedCourses]);

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>
        {selectedCourses.length > 0 ? "Legg til flere emner" : "Legg til emner"}
      </h2>

      <div className="inputContainer">
        <TextField
          disabled
          id="outlined-disabled"
          label={getSemesterText(currentSemesterCode)}
        />

        <Autocomplete
          className="Autocomplete"
          sx={{ border: "none", width: "100%" }}
          options={allSemesterCourses}
          getOptionDisabled={(option) =>
            selectedCoursesArray.includes(option.split(" - ")[0])
          }
          value={autocompleteValue}
          onChange={(event: any, newValue: string | null) => {
            setApiCourseSchedule([]);
            hideKeyboardiOSSafari();
            setAutocompleteValue(newValue);
            setCourseCode(newValue ? newValue.split(" - ")[0] : null); // only set courceCode
            newValue && setOpenDialogAddCourse(true);
          }}
          renderInput={(params) => (
            <TextField variant="outlined" {...params} label="Søk i emner" />
          )}
        />
      </div>

      {openDialogAddCourse && courseCode && (
        <DialogAddCourse
          baseUrl={baseUrl}
          open={openDialogAddCourse}
          setOpen={setOpenDialogAddCourse}
          currentSemesterCode={currentSemesterCode}
          allSemesterCourses={allSemesterCourses}
          courseCode={courseCode}
          setCourseCode={setCourseCode}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          apiCourseSchedule={apiCourseSchedule}
          setApiCourseSchedule={setApiCourseSchedule}
          autocompleteValue={autocompleteValue}
          setAutocompleteValue={setAutocompleteValue}
        />
      )}
    </div>
  );
};
