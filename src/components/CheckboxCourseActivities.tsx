import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FC, useEffect, useState } from "react";
import CourseActivityEvents from "../uio-api/interfaces/CourseActivityEvents";

const makeNewArrayOneValue = (length: number, value: boolean) => {
  const newArray = [];
  for (let i = 0; i < length; i++) {
    newArray[i] = value;
  }
  return newArray;
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
    checkedArray
      ? checkedArray
      : makeNewArrayOneValue(courseActivities.length, false)
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
            label={activity.activityTitle}
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
        label="Velg alle"
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
