import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Day, format } from "date-fns";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../domain/BusinessRule";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import { ja } from "date-fns/locale";

const PREFIX = "TimeTable";

const classes = {
  head: `${PREFIX}-head`,
  body: `${PREFIX}-body`,
};

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
        <TableCell
          key={"header-month-" + format(date, "MM月dd日hh時mm分")}
          align="center"
          padding="none"
          classes={{
            head: classes.head,
            body: classes.body,
          }}
        >
          {i === 0 || date.getDate() === 1 ? format(date, "M") : ""}
        </TableCell>
      ),
      day: (
        <TableCell
          key={"header-date-" + format(date, "MM月dd日hh時mm分")}
          align="center"
          padding="none"
          classes={{
            head: classes.head,
            body: classes.body,
          }}
        >
          {format(date, "d")}
        </TableCell>
      ),
      dayOfWeek: (
        <TableCell
          key={"header-week-of-day-" + format(date, "MM月dd日hh時mm分")}
          align="center"
          padding="none"
          classes={{
            head: classes.head,
            body: classes.body,
          }}
        >
          {ja.localize?.day(date.getDay() as Day, { width: "short" })}
        </TableCell>
      ),
    };
  });
  return (
    <Table size="small" stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell
            classes={{
              head: classes.head,
              body: classes.body,
            }}
          />
          {headers.map((e) => e.month)}
        </TableRow>
        <TableRow>
          <TableCell
            classes={{
              head: classes.head,
              body: classes.body,
            }}
          />
          {headers.map((e) => e.day)}
        </TableRow>
        <TableRow>
          <TableCell
            classes={{
              head: classes.head,
              body: classes.body,
            }}
          />
          {headers.map((e) => e.dayOfWeek)}
        </TableRow>
      </TableHead>
      <TableBody>
        {createBusinessTimesEveryThirtyMinutes(baseDate).map((e) => (
          <TableRow key={"table-row-" + e.toString()}>
            <TableCell
              key={"header-time-" + format(e, "HH:mm")}
              align="center"
              padding="none"
              classes={{
                head: classes.head,
                body: classes.body,
              }}
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
                  classes={{
                    head: classes.head,
                    body: classes.body,
                  }}
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
