import { Button, styled } from "@mui/material";
import { FC } from "react";
import { getStartOfWeekFromDate } from "../../../../functions/getStartOfWeekFromDate";
import { getWeekIntervalFromDate } from "../../../../functions/getWeekIntervalFromDate";

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "5px",
  ":hover": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

interface ShortcutButtonsCalendarProps {
  firstEventDate: Date | null;
  lastEventDate: Date | null;
  week: { weekInterval: Date[]; weekNumber: number };
  setWeek: (week: { weekInterval: Date[]; weekNumber: number }) => void;
}

export const ShortcutButtonsCalendar: FC<ShortcutButtonsCalendarProps> = ({
  firstEventDate,
  lastEventDate,
  week,
  setWeek,
}) => {
  const ShortcutButton = (
    activeStartOfWeek: Date,
    targetDate: Date,
    buttonText: string
  ) => {
    return (
      <StyledButton
        variant="outlined"
        onClick={() => {
          setWeek(getWeekIntervalFromDate(targetDate));
        }}
        sx={{
          backgroundColor:
            activeStartOfWeek.toISOString().split("T")[0] ===
            getStartOfWeekFromDate(targetDate)
              ? "primary.main"
              : "white",
          color:
            activeStartOfWeek.toISOString().split("T")[0] ===
            getStartOfWeekFromDate(targetDate)
              ? "white"
              : "primary.main",
        }}
      >
        {buttonText}
      </StyledButton>
    );
  };

  return (
    <div>
      <p style={{ marginBottom: "10px" }}>Snarveier</p>
      <div className="ShortcutButtonsCalendar">
        {ShortcutButton(week.weekInterval[0], new Date(), "I dag")}
        {firstEventDate &&
          ShortcutButton(week.weekInterval[0], firstEventDate, "Start")}
        {lastEventDate &&
          ShortcutButton(week.weekInterval[0], lastEventDate, "Slutt")}
      </div>
    </div>
  );
};
