import { ArrowBack, ArrowForward, Today } from "@mui/icons-material";
import {
  Button,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { endOfWeek, getWeek } from "date-fns";
import { eachDayOfInterval, startOfWeek } from "date-fns/esm";
import { FC, useEffect, useState } from "react";
import { combineCourseActivities } from "../uio-api/requests/combineCourseActivities";
import { getWeekIntervalString } from "../functions/getWeekIntervalString";
import CourseEvent from "../uio-api/interfaces/CourseEvent";
import { SelectedCourse } from "../uio-api/interfaces/SelectedCourse";
import { CalendarEvent } from "./CalendarEvent";
import { timeCells } from "./general/timeCells";
import { getWeekIntervalFromDate } from "../functions/getWeekIntervalFromDate";

const getStartOfWeekFromDate = (date: Date) => {
  const startOfWeekTodayDate = startOfWeek(date, { weekStartsOn: 1 });
  if (startOfWeekTodayDate.getHours() === 0) {
    startOfWeekTodayDate.setHours(startOfWeekTodayDate.getHours() + 12); // avoid time to be 00:00.000
  }
  return startOfWeekTodayDate.toISOString().split("T")[0];
};

const getEventsForTableCell = (
  allCourseEventsMap: Map<string, CourseEvent[]>,
  date: Date,
  time: string
) => {
  const cellDateTime =
    date.toISOString().split("T")[0] + "T" + time.split(":")[0];
  return allCourseEventsMap
    .get(cellDateTime)
    ?.map((courseEvent) => courseEvent);
};

const changeWeek = (
  setWeek: (week: { weekNumber: number; weekInterval: Date[] }) => void,
  direction: string,
  weekStart: Date
) => {
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

interface CalendarComponentProps {
  selectedCourses: SelectedCourse[];
}

export const CalendarComponent: FC<CalendarComponentProps> = ({
  selectedCourses,
}) => {
  const allCourseEventsMap = combineCourseActivities(selectedCourses);

  const today = new Date();
  const startOfWeekTodayString = getStartOfWeekFromDate(today);
  console.log("TODAY", startOfWeekTodayString);

  const firstDay = allCourseEventsMap.values().next().value;
  const firstEventDate = new Date(firstDay[0].dtStart);
  const startOfWeekFirstEventDateString =
    getStartOfWeekFromDate(firstEventDate);
  console.log("FIRST", startOfWeekFirstEventDateString);

  const lastDay = Array.from(allCourseEventsMap.values()).slice(-1)[0];
  const lastEventDate = new Date(lastDay[0].dtStart);
  const startOfWeekLastEventDateString = getStartOfWeekFromDate(lastEventDate);
  console.log("LAST", startOfWeekLastEventDateString);

  const [week, setWeek] = useState<{
    weekNumber: number;
    weekInterval: Date[];
  }>(getWeekIntervalFromDate(firstEventDate));
  const [activeShortcut, setActiveShortcut] =
    useState<string>("firstEventDate");

  useEffect(() => {
    console.log(week.weekInterval.includes(firstEventDate));
    console.log(week);
  }, [week]);

  const ShortcutButton = styled(Button)(({ theme }) => ({
    marginRight: "5px",
    ":hover": {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }));

  return (
    <div className="CalendarTableComponent">
      <div className="CalenderShortcutsContainer">
        <span style={{ marginRight: "10px" }}>Snarveier</span>
        <ShortcutButton
          variant="outlined"
          onClick={() => {
            setActiveShortcut("i dag");
            setWeek(getWeekIntervalFromDate(new Date()));
          }}
          sx={{
            backgroundColor:
              week.weekInterval[0].toISOString().split("T")[0] ===
              startOfWeekTodayString
                ? "primary.main"
                : "white",
            color:
              week.weekInterval[0].toISOString().split("T")[0] ===
              startOfWeekTodayString
                ? "white"
                : "primary.main",
          }}
        >
          I dag
        </ShortcutButton>
        <ShortcutButton
          variant="outlined"
          onClick={() => {
            setActiveShortcut("firstEventDate");
            setWeek(getWeekIntervalFromDate(firstEventDate));
          }}
          sx={{
            backgroundColor:
              week.weekInterval[0].toISOString().split("T")[0] ===
              startOfWeekFirstEventDateString
                ? "primary.main"
                : "white",
            color:
              week.weekInterval[0].toISOString().split("T")[0] ===
              startOfWeekFirstEventDateString
                ? "white"
                : "primary.main",
          }}
        >
          Start
        </ShortcutButton>
        <ShortcutButton
          variant="outlined"
          onClick={() => {
            setActiveShortcut("lastEventDate");
            setWeek(getWeekIntervalFromDate(lastEventDate));
          }}
          sx={{
            backgroundColor:
              week.weekInterval[0].toISOString().split("T")[0] ===
              startOfWeekLastEventDateString
                ? "primary.main"
                : "white",
            color:
              week.weekInterval[0].toISOString().split("T")[0] ===
              startOfWeekLastEventDateString
                ? "white"
                : "primary.main",
          }}
        >
          Slutt
        </ShortcutButton>
      </div>

      <div className="CalendarHeaderContainer">
        {week.weekInterval.length > 0 && (
          <h3>
            {getWeekIntervalString(week.weekInterval)}
            {" (uke " + week.weekNumber + ")"}
          </h3>
        )}
        <div className="CalenderPrevNextButtons">
          <IconButton
            sx={{ color: "black" }}
            onClick={() => changeWeek(setWeek, "prev", week.weekInterval[0])}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            sx={{ color: "black" }}
            onClick={() => changeWeek(setWeek, "next", week.weekInterval[0])}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
      <TableContainer>
        <Table
          sx={{
            width: "99.9%",
            minWidth: 600,
            border: "none",
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Tid</strong>
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
              const wednesdayEvents: CourseEvent[] | undefined =
                getEventsForTableCell(
                  allCourseEventsMap,
                  week.weekInterval[2],
                  time
                );
              const durations = wednesdayEvents?.map(
                (event) => event.durationHours!
              );
              const maxEventDurationHours = durations
                ? Math.max(...durations) // 1 cell = 1 hours
                : 1;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <strong>{time}</strong>
                  </TableCell>
                  <TableCell rowSpan={1}>{index}</TableCell>
                  <TableCell rowSpan={1}>{index}</TableCell>
                  <TableCell rowSpan={maxEventDurationHours}>
                    <div className="CalenderTableCellContainer">
                      {wednesdayEvents?.map((courseEvent) => (
                        <CalendarEvent courseEvent={courseEvent} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell rowSpan={1}>{index}</TableCell>
                  <TableCell rowSpan={1}>{index}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
