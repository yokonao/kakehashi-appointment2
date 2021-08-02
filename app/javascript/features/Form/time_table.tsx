import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format, addDays, eachMinuteOfInterval } from "date-fns";
import { eachDayOfInterval } from "date-fns/esm";
import * as React from "react";
import {
  getAfternoonOpeningTime,
  getLastTime,
  getMorningLastTime,
  getOpeningTime,
} from "../../domain/business_rule";

type TimeTableProps = {
  name: string;
  baseDate: Date;
};

function createTwoWeeks(baseDate: Date): Date[] {
  return eachDayOfInterval({ start: baseDate, end: addDays(baseDate, 14) });
}

function createBusinessTimesEveryThirtyMinutes(base: Date): Date[] {
  const interval = 30;
  return eachMinuteOfInterval(
    {
      start: getOpeningTime(base),
      end: getMorningLastTime(base),
    },
    { step: interval }
  ).concat(
    eachMinuteOfInterval(
      {
        start: getAfternoonOpeningTime(base),
        end: getLastTime(base),
      },
      { step: interval }
    )
  );
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
      <Table
        className={classes.table}
        size="small"
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {createTwoWeeks(props.baseDate).map((date) => (
              <TableCell align="right">{format(date, "MM/dd")}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {createBusinessTimesEveryThirtyMinutes(props.baseDate).map((e) => (
            <TableRow>
              <TableCell>{format(e, "hh:mm")}</TableCell>
              {createTwoWeeks(props.baseDate).map((date) => {
                return <TableCell align="center">○</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TimeTable;
