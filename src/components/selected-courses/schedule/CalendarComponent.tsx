import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getWeekIntervalFromDate } from "../../../functions/getWeekIntervalFromDate";
import CourseEvent from "../../../uio-api/interfaces/CourseEvent";
import { DialogCalendarEvent } from "../../dialogs/DialogCalendarEvent";
import { timeCells } from "../../general/timeCells";
import { CalendarEvent } from "./calendar-view/CalendarEvent";
import { CalendarHeader } from "./calendar-view/CalendarHeader";
import { TableHeadDates } from "./calendar-view/TableHeaderDates";
import { CalendarListComponent } from "./list-view/CalendarListComponent";
import { ToggleButtonsCalendarView } from "./ToggleButtonsCalendarView";

interface CalendarComponentProps {
  allCourseEventsMap: Map<string, CourseEvent[]>;
}

export const CalendarComponent: FC<CalendarComponentProps> = ({
  allCourseEventsMap,
}) => {
  const [view, setView] = useState<string>("calendar");
  const [firstEventDate, setFirstEventDate] = useState<Date | undefined>(
    undefined
  );
  const [lastEventDate, setLastEventDate] = useState<Date | undefined>(
    undefined
  );
  const [activeWeek, setActiveWeek] = useState<{
    weekNumber: number;
    weekInterval: Date[];
  }>(getWeekIntervalFromDate(new Date()));

  const [openDialogCalendarEvent, setOpenDialogCalendarEvent] =
    useState<boolean>(false);
  const [dialogCourseEvent, setDialogCourseEvent] =
    useState<CourseEvent | null>(null);

  useEffect(() => {
    if (allCourseEventsMap.size > 0) {
      const courseEventDays = Array.from(allCourseEventsMap.keys()).sort();
      const firstDate = new Date(courseEventDays[0].split("T")[0]);
      const lastDate = new Date(
        courseEventDays[courseEventDays.length - 1].split("T")[0]
      );
      setFirstEventDate(firstDate);
      setLastEventDate(lastDate);
      if (
        activeWeek.weekInterval[0] < firstDate ||
        activeWeek.weekInterval[activeWeek.weekInterval.length - 1] > lastDate
      ) {
        setActiveWeek(getWeekIntervalFromDate(firstDate));
      }
    }
  }, [allCourseEventsMap, setActiveWeek]);

  const weekDayTimesRowSpan = [
    { rowSpan: 0, hasEvents: false },
    { rowSpan: 0, hasEvents: false },
    { rowSpan: 0, hasEvents: false },
    { rowSpan: 0, hasEvents: false },
    { rowSpan: 0, hasEvents: false },
  ];

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

  return (
    <div className="CalendarComponent">
      <ToggleButtonsCalendarView view={view} setView={setView} />

      <CalendarHeader
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        firstEventDate={firstEventDate}
        lastEventDate={lastEventDate}
      />

      {view === "list" ? (
        <CalendarListComponent allCourseEventsMap={allCourseEventsMap} />
      ) : (
        <div className="CalendarTableContainer">
          <TableContainer sx={{ maxHeight: 800 }}>
            <Table
              // stickyHeader
              sx={{
                width: "99.9%",
                minWidth: 600,
                border: "none",
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableHeadDates week={activeWeek} />
              </TableHead>
              <TableBody>
                {timeCells.map((time: string) => {
                  return (
                    <TableRow key={time}>
                      <TableCell>
                        <strong>{time}</strong>
                      </TableCell>
                      {weekDayTimesRowSpan.map((weekDayTimeCell, index) => {
                        const events = getEventsForTableCell(
                          allCourseEventsMap,
                          activeWeek.weekInterval[index],
                          time
                        );

                        weekDayTimesRowSpan[index].hasEvents = false;
                        if (weekDayTimesRowSpan[index].rowSpan > 0)
                          weekDayTimesRowSpan[index].rowSpan--;

                        if (events) {
                          const durations = events.map(
                            (event) => event.durationHours!
                          );
                          weekDayTimesRowSpan[index].rowSpan = Math.max(
                            ...durations
                          );
                          weekDayTimesRowSpan[index].hasEvents = true;
                        }

                        if (weekDayTimeCell.hasEvents) {
                          return (
                            <TableCell
                              key={index}
                              rowSpan={
                                weekDayTimeCell.rowSpan > 0
                                  ? weekDayTimeCell.rowSpan
                                  : 1
                              }
                            >
                              <div className="CalenderTableCellContainer">
                                {events?.map((courseEvent, index) => {
                                  return (
                                    <CalendarEvent
                                      key={index}
                                      courseEvent={courseEvent}
                                      setOpen={setOpenDialogCalendarEvent}
                                      setDialogCourseEvent={
                                        setDialogCourseEvent
                                      }
                                    />
                                  );
                                })}
                              </div>
                            </TableCell>
                          );
                        } else if (weekDayTimeCell.rowSpan === 0) {
                          return <TableCell key={index}></TableCell>;
                        } else {
                          return (
                            <TableCell // is hidden
                              key={index}
                              sx={{ display: "none" }}
                            ></TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {openDialogCalendarEvent && dialogCourseEvent && (
            <DialogCalendarEvent
              open={openDialogCalendarEvent}
              setOpen={setOpenDialogCalendarEvent}
              courseEvent={dialogCourseEvent}
            />
          )}
        </div>
      )}
    </div>
  );
};
