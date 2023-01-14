import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getWeekIntervalFromDate } from "../../../functions/getWeekIntervalFromDate";
import { getWeekIntervalString } from "../../../functions/getWeekIntervalString";
import CourseEvent from "../../../uio-api/interfaces/CourseEvent";
import { timeCells } from "../../general/timeCells";
import { CalendarEvent } from "./calendar-view/CalendarEvent";
import { changeWeek } from "./calendar-view/changeWeek";
import { ShortcutButtonsCalendar } from "./calendar-view/ShortcutButtonsCalendar";

import { TableHeaderDates } from "./calendar-view/TableHeaderDates";

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

interface CalendarComponentProps {
  allCourseEventsMap: Map<string, CourseEvent[]>;
}

export const CalendarComponent: FC<CalendarComponentProps> = ({
  allCourseEventsMap,
}) => {
  const [firstEventDate, setFirstEventDate] = useState<Date | null>(null);
  const [lastEventDate, setLastEventDate] = useState<Date | null>(null);
  const [week, setWeek] = useState<{
    weekNumber: number;
    weekInterval: Date[];
  }>(getWeekIntervalFromDate(new Date()));

  useEffect(() => {
    if (allCourseEventsMap.size > 0) {
      const courseEventDays = Array.from(allCourseEventsMap.keys()).sort();
      const firstDate = new Date(courseEventDays[0].split("T")[0]);
      const lastDate = new Date(
        courseEventDays[courseEventDays.length - 1].split("T")[0]
      );
      setFirstEventDate(firstDate);
      setLastEventDate(lastDate);
      setWeek(getWeekIntervalFromDate(firstDate));
    }
  }, [allCourseEventsMap]);

  return (
    <div className="CalendarTableComponent">
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
        {/* <ShortcutButtonsCalendar
          firstEventDate={firstEventDate}
          lastEventDate={lastEventDate}
          week={week}
          setWeek={setWeek}
        /> */}

        <div className="CalenderWeekPicker">
          {
            <span>
              Velg uke <u>1, 2, 3, 4</u>
            </span>
          }
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
            <TableHeaderDates week={week} />
          </TableHead>
          <TableBody>
            {timeCells.map((time: string, index: number) => {
              // const wednesdayEvents: CourseEvent[] | undefined =
              //   getEventsForTableCell(
              //     allCourseEventsMap,
              //     week.weekInterval[2],
              //     time
              //   );
              // const durations = wednesdayEvents?.map(
              //   (event) => event.durationHours!
              // );
              // const maxEventDurationHours = durations
              //   ? Math.max(...durations) // 1 cell = 1 hours
              //   : 1;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <strong>{time}</strong>
                  </TableCell>
                  <TableCell rowSpan={1}>
                    <div className="CalenderTableCellContainer">
                      {getEventsForTableCell(
                        allCourseEventsMap,
                        week.weekInterval[0],
                        time
                      )?.map((courseEvent) => (
                        <CalendarEvent courseEvent={courseEvent} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell rowSpan={1}>
                    <div className="CalenderTableCellContainer">
                      {getEventsForTableCell(
                        allCourseEventsMap,
                        week.weekInterval[1],
                        time
                      )?.map((courseEvent) => (
                        <CalendarEvent courseEvent={courseEvent} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell rowSpan={1}>
                    <div className="CalenderTableCellContainer">
                      {getEventsForTableCell(
                        allCourseEventsMap,
                        week.weekInterval[2],
                        time
                      )?.map((courseEvent) => (
                        <CalendarEvent courseEvent={courseEvent} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell rowSpan={1}>
                    <div className="CalenderTableCellContainer">
                      {getEventsForTableCell(
                        allCourseEventsMap,
                        week.weekInterval[3],
                        time
                      )?.map((courseEvent) => (
                        <CalendarEvent courseEvent={courseEvent} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell rowSpan={1}>
                    <div className="CalenderTableCellContainer">
                      {getEventsForTableCell(
                        allCourseEventsMap,
                        week.weekInterval[4],
                        time
                      )?.map((courseEvent) => (
                        <CalendarEvent courseEvent={courseEvent} />
                      ))}
                    </div>
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
