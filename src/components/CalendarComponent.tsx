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
    <div className="CalendarContainer">
      <div className="CalendarTableHeader">
        {week.weekInterval.length > 0 && (
          <h3>{getWeekIntervalString(week.weekInterval)}</h3>
        )}
        <div className="CalenderPrevNextButtons">
          <IconButton
            color={"primary"}
            onClick={() => changeWeek("prev", week.weekInterval[0])}
          >
            <ArrowBack />
          </IconButton>
          <Button
            variant="outlined"
            onClick={() => setWeek(getCurrentWeekInterval())}
            sx={{
              marginLeft: "5px",
              marginRight: "5px",
              ":hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            I dag
          </Button>
          <IconButton
            color={"primary"}
            onClick={() => changeWeek("next", week.weekInterval[0])}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
      <TableContainer>
        <Table
          sx={{ width: "98%", minWidth: 600 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Uke {week.weekNumber}</strong>
              </TableCell>
              <TableCell align="center">Mandag</TableCell>
              <TableCell align="center">Tirsdag</TableCell>
              <TableCell align="center">Onsdag</TableCell>
              <TableCell align="center">Torsdag</TableCell>
              <TableCell align="center">Fredag</TableCell>
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
