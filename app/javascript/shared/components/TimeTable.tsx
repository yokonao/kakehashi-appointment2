import * as React from "react";
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format } from "date-fns";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../domain/BusinessRule";
import { MenuSerializer } from "../../serializers/MenuSerializer";

type TimeTableProps = {
  menus: MenuSerializer[];
  baseDate: Date;
  onSelect: (menu: MenuSerializer) => void;
  days: number
};

const TimeTable = (props: TimeTableProps) => {
  const { menus, baseDate, onSelect, days } = props;
  return (
    <Table size="small" stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell />
          {createDaysOnTheTime(baseDate, days).map((date) => (
            <TableCell
              key={"header-date-" + format(date, "MM月dd日hh時mm分")}
              align="center"
              padding="none"
            >
              {format(date, "M/d")}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {createBusinessTimesEveryThirtyMinutes(baseDate).map((e) => (
          <TableRow key={"table-row-" + e.toString()}>
            <TableCell
              key={"header-time-" + format(e, "HH:mm")}
              align="center"
              padding="none"
            >
              {format(e, "HH:mm")}
            </TableCell>
            {createDaysOnTheTime(e, days).map((date) => {
              const menu = menus.find(
                (menu) => menu.start_at.getTime() === date.getTime()
              );
              return (
                <TableCell
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
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeTable;
