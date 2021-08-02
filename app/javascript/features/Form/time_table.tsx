import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format, addDays } from "date-fns";
import * as React from "react";

type TimeTableProps = {
  name: string;
  baseDate: Date;
};

function createTwoWeeks(baseDate: Date): Date[] {
  return Array.from(new Array(14))
    .map((_, i) => i)
    .map((e) => addDays(baseDate, e));
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    maxWidth: 800,
  },
});

const TimeTable = (props: TimeTableProps) => {
  const classes = useStyles();
  return (
    <>
      <div>タイムテーブル: {props.name}</div>
      {createTwoWeeks(props.baseDate).map((e) => (
        <div>{format(e, "MM/dd")}</div>
      ))}
      <Table
        className={classes.table}
        size="small"
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            {createTwoWeeks(props.baseDate).map((date) => (
              <TableCell align="right">{format(date, "MM/dd")}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </>
  );
};

export default TimeTable;
