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
} from "@material-ui/core";
import { format } from "date-fns";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../domain/BusinessRule";
import { MenuSerializer } from "../../serializers/MenuSerializer";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      border: "0.5px dotted",
      borderColor: theme.palette.primary.main,
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
  return (
    <Table size="small" stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <StyledTableCell />
          {createDaysOnTheTime(baseDate, days).map((date) => (
            <StyledTableCell
              key={"header-date-" + format(date, "MM月dd日hh時mm分")}
              align="center"
              padding="none"
            >
              {format(date, "M/d")}
            </StyledTableCell>
          ))}
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
                    "-"
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
