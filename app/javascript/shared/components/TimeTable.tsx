import {
  Box,
  Icon,
  IconButton,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { format, addDays, eachMinuteOfInterval } from "date-fns";
import * as React from "react";
import {
  getAfternoonOpeningTime,
  getLastTime,
  getMorningLastTime,
  getOpeningTime,
} from "../../domain/BuisinessRule";
import { MenuSerializer } from "../../features/hooks/useMenusContext";

type TimeTableProps = {
  value?: MenuSerializer;
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
  const { value } = props;
  const classes = useStyles();
  return (
    <Box m={2}>
      <Box mb={2}>
        <TextField
          variant="outlined"
          value={value ? format(value.start_at, "yyyy年M月d日H時mm分") : ""}
          placeholder="予約日時"
          helperText="下の表から選択してください"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Icon color="primary">check</Icon>
              </InputAdornment>
            ),
          }}
        />
      </Box>
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
              <TableCell align="center" padding="none">
                {format(e, "HH:mm")}
              </TableCell>
              {createTwoWeeks(e).map((date) => {
                const menu = props.menus.find(
                  (menu) => menu.start_at.getTime() === date.getTime()
                );
                return (
                  <TableCell align="center" padding="none" size="small">
                    {menu ? (
                      <IconButton
                        color={menu.isFilled ? "default" : "primary"}
                        onClick={() => props.onSelect(menu)}
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
    </Box>
  );
});

export default TimeTable;
