import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const timeCells = [
  "08:00",
  " ",
  "09:00",
  " ",
  "10:00",
  " ",
  "11:00",
  " ",
  "12:00",
  " ",
  "13:00",
  " ",
  "14:00",
  " ",
  "15:00",
  " ",
  "16:00",
];

export const CalendarComponent = () => {
  return (
    <div className="CalendarContainer">
      <TableContainer>
        <Table
          sx={{ width: "95%", minWidth: 500, border: "none" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <div className="TableHead">
              <Button variant="contained">Neste</Button>
            </div>
            <TableRow>
              <TableCell>Uke 1</TableCell>
              <TableCell>Mandag</TableCell>
              <TableCell>Tirsdag</TableCell>
              <TableCell>Onsdag</TableCell>
              <TableCell>Torsdag</TableCell>
              <TableCell>Fredag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeCells.map((time, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "#f7f7f7" }
                    : { background: "white" }
                }
              >
                <TableCell>{time}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
