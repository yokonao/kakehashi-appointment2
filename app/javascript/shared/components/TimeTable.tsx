import {
  Button,
  Icon,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format, addDays, eachMinuteOfInterval } from "date-fns";
import * as React from "react";
import {
  getAfternoonOpeningTime,
  getLastTime,
  getMorningLastTime,
  getOpeningTime,
} from "../../domain/business_rule";
import { MenuSerializer } from "../../features/hooks/useMenusContext";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

type TimeTableProps = {
  menus: MenuSerializer[];
  baseDate: Date;
  onSelect: (menu: MenuSerializer) => void;
};

function createTwoWeeks(baseDate: Date): Date[] {
  return eachMinuteOfInterval(
    { start: baseDate, end: addDays(baseDate, 14) },
    { step: 24 * 60 }
  );
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
  table: {},
});

const TimeTable = React.memo((props: TimeTableProps) => {
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
              <TableCell align="center" padding="none">
                {format(date, "MM/dd")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {createBusinessTimesEveryThirtyMinutes(props.baseDate).map((e) => (
            <TableRow>
              <TableCell align="center" padding="none">{format(e, "hh:mm")}</TableCell>
              {createTwoWeeks(e).map((date) => {
                const menu = props.menus.find(
                  (menu) => menu.start_at.getTime() === date.getTime()
                );
                return (
                  <TableCell align="center" padding="none" size="small">
                    {menu ? (
                      <IconButton
                        color="primary"
                        onClick={() => props.onSelect(menu)}
                        size="small"
                      >
                        <Icon>event_note</Icon>
                      </IconButton>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
});

export default TimeTable;
