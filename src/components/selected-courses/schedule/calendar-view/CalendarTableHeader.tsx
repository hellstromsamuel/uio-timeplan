import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { getYear, setWeek, startOfWeek } from "date-fns";
import { FC, useEffect, useState } from "react";
import { getWeekIntervalFromDate } from "../../../../functions/getWeekIntervalFromDate";
import { getWeekIntervalString } from "../../../../functions/getWeekIntervalString";
import { changeWeek } from "./changeWeek";

interface CalendarTableHeaderProps {
  activeWeek: {
    weekNumber: number;
    weekInterval: Date[];
  };
  setActiveWeek: (activeWeek: {
    weekNumber: number;
    weekInterval: Date[];
  }) => void;
  firstEventDate?: Date;
  lastEventDate?: Date;
}

export const CalendarTableHeader: FC<CalendarTableHeaderProps> = ({
  activeWeek,
  setActiveWeek,
  firstEventDate,
  lastEventDate,
}) => {
  const [startWeek, setStartWeek] = useState<{
    weekNumber: number;
    weekInterval: Date[];
  } | null>(null);
  const [endWeek, setEndWeek] = useState<{
    weekNumber: number;
    weekInterval: Date[];
  } | null>(null);

  useEffect(() => {
    if (firstEventDate && lastEventDate) {
      setStartWeek(getWeekIntervalFromDate(firstEventDate));
      setEndWeek(getWeekIntervalFromDate(lastEventDate));
    }
  }, [firstEventDate, lastEventDate]);

  const handleWeekNumberOnClick = (weekNumber: number) => {
    const date = new Date();
    const year = getYear(date);
    const firstDayOfWeek = startOfWeek(
      setWeek(new Date(year, 0, 1), weekNumber),
      { weekStartsOn: 1 }
    );
    const weekIntervalWeekNumber = getWeekIntervalFromDate(firstDayOfWeek);
    setActiveWeek(weekIntervalWeekNumber);
  };

  const weekSpan = (weekNumber: number) => {
    return (
      <button
        onClick={() => handleWeekNumberOnClick(weekNumber)}
        style={{
          border: "1px solid lightgray",
          backgroundColor:
            activeWeek.weekNumber === weekNumber ? "lightgray" : "white",
          color: "black",
          fontSize: "10px",
          padding: "3px",
          marginLeft: "2px",
          marginBottom: "2px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {weekNumber === -1 ? "I dag" : weekNumber}
      </button>
    );
  };

  const weekNumberButtonsArray = () => {
    const allWeekNumberButtonsArray: React.ReactElement[] = [];
    if (startWeek && endWeek) {
      for (let i = startWeek.weekNumber; i <= endWeek.weekNumber; i++) {
        allWeekNumberButtonsArray.push(weekSpan(i));
      }
    }
    return allWeekNumberButtonsArray;
  };

  return (
    <div className="CalendarTableHeader">
      {activeWeek.weekInterval.length > 0 && (
        <h3>
          {getWeekIntervalString(activeWeek.weekInterval)}
          {" (uke " + activeWeek.weekNumber + ")"}
        </h3>
      )}

      <div className="CalenderPrevNextButtons">
        <IconButton
          sx={{ color: "black" }}
          onClick={() =>
            changeWeek(setActiveWeek, "prev", activeWeek.weekInterval[0])
          }
        >
          <ArrowBack />
        </IconButton>

        <IconButton
          sx={{ color: "black" }}
          onClick={() =>
            changeWeek(setActiveWeek, "next", activeWeek.weekInterval[0])
          }
        >
          <ArrowForward />
        </IconButton>
      </div>

      <div className="CalenderWeekPicker">
        <span>Velg uke</span>
        <div className="CalendarWeekNumbers">
          {firstEventDate &&
            lastEventDate &&
            weekNumberButtonsArray().map((weekNumberSpan) => weekNumberSpan)}
        </div>
      </div>
    </div>
  );
};
