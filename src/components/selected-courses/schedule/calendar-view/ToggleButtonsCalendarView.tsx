import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CalendarMonth, FormatListBulleted } from "@mui/icons-material";
import { FC } from "react";

interface CalendarViewToggleButtonsProps {
  view: string;
  setView: (view: string) => void;
}

export const ToggleButtonsCalendarView: FC<CalendarViewToggleButtonsProps> = ({
  view,
  setView,
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    if (nextView) {
      setView(nextView);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: "10px" }}>Visning</p>
      <div>
        <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
          <ToggleButton value="timeplan" aria-label="timeplan">
            <CalendarMonth />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <FormatListBulleted />
          </ToggleButton>
          <ToggleButton value="text" aria-label="text">
            Tekst
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};
