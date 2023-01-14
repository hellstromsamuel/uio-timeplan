import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { getDateAsString } from "../../../../functions/getDateAsString";

interface TableHeaderDatesProps {
  week: {
    weekInterval: Date[];
    weekNumber: number;
  };
}

const TableCellContainer = (props: { left: string; right: string }) => {
  return (
    <div style={{ fontWeight: "bold", minWidth: 100 }}>
      <div style={{ float: "left" }}>{props.left}</div>
      <div style={{ float: "right" }}>{props.right}</div>
    </div>
  );
};

export const TableHeaderDates: FC<TableHeaderDatesProps> = ({ week }) => {
  return (
    <TableRow>
      <TableCell>
        <TableCellContainer left="Tid" right="" />
      </TableCell>
      <TableCell>
        <TableCellContainer
          left="Man."
          right={getDateAsString(week.weekInterval[0])}
        />
      </TableCell>
      <TableCell>
        <TableCellContainer
          left="Tir."
          right={getDateAsString(week.weekInterval[1])}
        />
      </TableCell>
      <TableCell>
        <TableCellContainer
          left="Ons."
          right={getDateAsString(week.weekInterval[2])}
        />
      </TableCell>
      <TableCell>
        <TableCellContainer
          left="Tor."
          right={getDateAsString(week.weekInterval[3])}
        />
      </TableCell>
      <TableCell>
        <TableCellContainer
          left="Fre."
          right={getDateAsString(week.weekInterval[4])}
        />
      </TableCell>
    </TableRow>
  );
};
