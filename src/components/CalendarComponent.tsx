import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { endOfWeek, getWeek } from "date-fns";
import { eachDayOfInterval } from "date-fns/esm";
import { FC, useState } from "react";
import { combineCourseActivities } from "../functions/combineCourseActivities";
import { getCurrentWeekInterval } from "../functions/getCurrentWeekInterval";
import { getWeekIntervalString } from "../functions/getWeekIntervalString";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { CalendarEvent } from "./CalendarEvent";
import { timeCells } from "./general/timeCells";

interface CalendarComponentProps {
  selectedCourses: SelectedCourse[];
}

export const CalendarComponent: FC<CalendarComponentProps> = ({
  selectedCourses,
}) => {
  const [week, setWeek] = useState<{
    weekNumber: number;
    weekInterval: Date[];
  }>(getCurrentWeekInterval());

  const allCourseEventsMap = combineCourseActivities(selectedCourses);

  const changeWeek = (direction: string, weekStart: Date) => {
    const newWeekStart = weekStart;
    direction === "prev"
      ? newWeekStart.setDate(weekStart.getDate() - 7)
      : newWeekStart.setDate(weekStart.getDate() + 7);
    const newWeekEnd = endOfWeek(newWeekStart, { weekStartsOn: 1 });
    newWeekEnd.setDate(newWeekEnd.getDate() - 2);

    const weekInterval = eachDayOfInterval({
      start: newWeekStart,
      end: newWeekEnd,
    });
    weekInterval.forEach((date) => {
      date.setHours(date.getHours() + 12);
    });

    setWeek({
      weekNumber: getWeek(newWeekStart),
      weekInterval: weekInterval,
    });
  };

  const getEventsForTableCell = (date: Date, time: string) => {
    const cellDateTime =
      date.toISOString().split("T")[0] + "T" + time.split(":")[0];

    return (
      <div>
        {allCourseEventsMap.get(cellDateTime)?.map((courseEvent, index) => {
          return <CalendarEvent key={index} courseEvent={courseEvent} />;
        })}
      </div>
    );
  };

  return (
    <div className="CalendarTableComponent">
      <div className="CalenderShortcutsContainer">
        <Button
          variant="outlined"
          onClick={() => setWeek(getCurrentWeekInterval())}
          sx={{
            marginLeft: "5px",
            marginRight: "5px",
            color: "black",
            border: "1px solid black",
            ":hover": {
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
            },
          }}
        >
          I dag
        </Button>
        <Button
          variant="outlined"
          onClick={() => setWeek(getCurrentWeekInterval())}
          sx={{
            marginLeft: "5px",
            marginRight: "5px",
            color: "black",
            border: "1px solid black",
            ":hover": {
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
            },
          }}
        >
          Start
        </Button>
        <Button
          variant="outlined"
          onClick={() => setWeek(getCurrentWeekInterval())}
          sx={{
            marginLeft: "5px",
            marginRight: "5px",
            color: "black",
            border: "1px solid black",
            ":hover": {
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
            },
          }}
        >
          Slutt
        </Button>
      </div>

      <div className="CalendarHeaderContainer">
        {week.weekInterval.length > 0 && (
          <h3>{getWeekIntervalString(week.weekInterval)}</h3>
        )}
        <div className="CalenderPrevNextButtons">
          <IconButton
            sx={{ color: "black" }}
            onClick={() => changeWeek("prev", week.weekInterval[0])}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            sx={{ color: "black" }}
            onClick={() => changeWeek("next", week.weekInterval[0])}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
      <TableContainer>
        <Table
          sx={{ width: "99.9%", minWidth: 600, border: "none" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Uke {week.weekNumber}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Mandag</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Tirsdag</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Onsdag</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Torsdag</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Fredag</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeCells.map((time, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{time}</TableCell>
                  <TableCell>
                    {time && getEventsForTableCell(week.weekInterval[0], time)}
                  </TableCell>
                  <TableCell>
                    {time && getEventsForTableCell(week.weekInterval[1], time)}
                  </TableCell>
                  <TableCell>
                    {time && getEventsForTableCell(week.weekInterval[2], time)}
                  </TableCell>
                  <TableCell>
                    {time && getEventsForTableCell(week.weekInterval[3], time)}
                  </TableCell>
                  <TableCell>
                    {time && getEventsForTableCell(week.weekInterval[4], time)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
