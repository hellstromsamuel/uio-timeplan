import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface SemesterToggleButtonsProps {
  courseSemesters?: string[];
  semesterCode?: string;
  setSemesterCode: (semesterCode?: string) => void;
}
<ToggleButton value="23v">Vår 2023</ToggleButton>;

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
      {props.courseSemesters?.map((semester) => {
        const semesterSeason = semester.slice(-1);
        const semesterYear = semester.slice(0, 2);
        return (
          <ToggleButton // TODO: egen style på knappene
            key={semester}
            value={semester}
            className="ToggleButton"
          >
            {semesterSeason === "h"
              ? "Høst 20" + semesterYear
              : "Vår 20" + semesterYear}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
