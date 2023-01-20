import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FC, useEffect, useState } from "react";
import CourseActivityEvents from "../../uio-api/interfaces/CourseActivityEvents";

const makeNewArrayOneValue = (length: number, value: boolean) => {
  const newArray = [];
  for (let i = 0; i < length; i++) {
    newArray[i] = value;
  }
  return newArray;
};

const makeStartArray = (courseActivities: CourseActivityEvents[]) => {
  const newArray: boolean[] = [];
  courseActivities.forEach((activity, i) => {
    newArray[i] = activity.activitySelected ? true : false;
  });
  return newArray;
};

const getActivityLabelFromEvents = (activity: CourseActivityEvents) => {
  const acitvityWeekDayAndTimes: string[] = [];
  activity.events.forEach((event) => {
    const weekdayAndTime =
      event.weekday +
      " " +
      event.dtStart.split("T")[1].slice(0, 5) +
      "-" +
      event.dtEnd.split("T")[1].slice(0, 5);
    if (!acitvityWeekDayAndTimes.includes(weekdayAndTime)) {
      acitvityWeekDayAndTimes.push(weekdayAndTime);
    }
  });

  return (
    <span>
      <u>{activity.activityTitle}</u>
      {" - " + acitvityWeekDayAndTimes.join(", ")}
    </span>
  );
};

interface CheckboxCourseActivitiesProps {
  courseActivities: CourseActivityEvents[];
  checkedArray?: boolean[];
}

export const CheckboxCourseActivities: FC<CheckboxCourseActivitiesProps> = ({
  courseActivities,
  checkedArray,
}) => {
  const [checked, setChecked] = useState<boolean[]>(
    checkedArray ? checkedArray : makeStartArray(courseActivities)
  );

  useEffect(() => {
    if (courseActivities.length !== checked.length) {
      setChecked(makeNewArrayOneValue(courseActivities.length, false));
    }
  }, [checked, courseActivities]);

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(
      makeNewArrayOneValue(courseActivities.length, event.target.checked)
    );
    for (let i = 0; i < courseActivities.length; i++) {
      courseActivities[i].activitySelected = event.target.checked;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newArray = [];
    for (let i = 0; i < courseActivities.length; i++) {
      newArray[i] = checked[i];
    }

    newArray[index] = event.target.checked;
    setChecked(newArray);
    courseActivities[index].activitySelected = event.target.checked;
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {courseActivities.map((activity, index) => {
        return (
          <FormControlLabel
            key={index}
            label={getActivityLabelFromEvents(activity)}
            control={
              <Checkbox
                checked={checked[index]}
                onChange={(event) => handleChange(event, index)}
              />
            }
          />
        );
      })}
    </Box>
  );

  return (
    <div>
      <p className="inputLabel">Hvilke aktiviteter vil du følge?</p>
      <FormControlLabel
        label={"Velg alle (" + courseActivities.length + ")"}
        control={
          <Checkbox
            checked={checked.every((checkboxValue) => checkboxValue === true)}
            indeterminate={new Set(checked).size > 1}
            onChange={handleChangeAll}
          />
        }
      />
      {children}
    </div>
  );
};
