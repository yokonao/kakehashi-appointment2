import * as React from "react";
import {
  createStyles,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from "@mui/material";
import { format } from "date-fns";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../domain/BusinessRule";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import { ja } from "date-fns/locale";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

type TimeTableProps = {
  menus: MenuSerializer[];
  baseDate: Date;
  onSelect: (menu: MenuSerializer) => void;
  days: number;
};

const TimeTable = (props: TimeTableProps) => {
  const { menus, baseDate, onSelect, days } = props;
  const headers = createDaysOnTheTime(baseDate, days).map((date, i) => {
    return {
      month: (
        <StyledTableCell
          key={"header-month-" + format(date, "MM月dd日hh時mm分")}
          align="center"
          padding="none"
        >
          {i === 0 || date.getDate() === 1 ? format(date, "M") : ""}
        </StyledTableCell>
      ),
      day: (
        <StyledTableCell
          key={"header-date-" + format(date, "MM月dd日hh時mm分")}
          align="center"
          padding="none"
        >
          {format(date, "d")}
        </StyledTableCell>
      ),
      dayOfWeek: (
        <StyledTableCell
          key={"header-week-of-day-" + format(date, "MM月dd日hh時mm分")}
          align="center"
          padding="none"
        >
          {ja.localize?.day(date.getDay(), { width: "short" })}
        </StyledTableCell>
      ),
    };
  });
  return (
    <Table size="small" stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <StyledTableCell />
          {headers.map((e) => e.month)}
        </TableRow>
        <TableRow>
          <StyledTableCell />
          {headers.map((e) => e.day)}
        </TableRow>
        <TableRow>
          <StyledTableCell />
          {headers.map((e) => e.dayOfWeek)}
        </TableRow>
      </TableHead>
      <TableBody>
        {createBusinessTimesEveryThirtyMinutes(baseDate).map((e) => (
          <TableRow key={"table-row-" + e.toString()}>
            <StyledTableCell
              key={"header-time-" + format(e, "HH:mm")}
              align="center"
              padding="none"
            >
              {format(e, "HH:mm")}
            </StyledTableCell>
            {createDaysOnTheTime(e, days).map((date) => {
              const menu = menus.find(
                (menu) => menu.start_at.getTime() === date.getTime()
              );
              return (
                <StyledTableCell
                  key={"menu-" + date.toString()}
                  align="center"
                  padding="none"
                  size="small"
                >
                  {menu ? (
                    <IconButton
                      data-testid="select-menu-button"
                      color={menu.isFilled ? "default" : "primary"}
                      onClick={() => {
                        onSelect(menu);
                      }}
                      size="small"
                      disabled={menu.isFilled}
                    >
                      <Icon>event_note</Icon>
                    </IconButton>
                  ) : (
                    <IconButton color={"default"} size="small" disabled>
                      <Icon>close</Icon>
                    </IconButton>
                  )}
                </StyledTableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeTable;
