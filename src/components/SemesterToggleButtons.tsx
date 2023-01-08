import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface SemesterToggleButtonsProps {
  semesters: { value: string; text: string }[];
  semesterCode?: string;
  setSemesterCode: (semesterCode?: string) => void;
}

export const SemesterToggleButtons = (props: SemesterToggleButtonsProps) => {
  const [selected, setSelected] = useState<string | undefined>(
    props.semesterCode
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    semesterCode: string
  ) => {
    if (semesterCode) {
      setSelected(semesterCode);
      props.setSemesterCode(semesterCode);
    } else {
      props.setSemesterCode(selected); // when semesterCode is 'null'
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={props.semesterCode}
      exclusive
      onChange={handleChange}
    >
      {props.semesters?.map((semester) => {
        return (
          <ToggleButton // TODO: egen style på knappene
            sx={{ fontSize: "14px" }}
            key={semester.value}
            value={semester.value}
            className="ToggleButton"
          >
            {semester.text}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
