import {
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { format, addDays, eachMinuteOfInterval } from "date-fns";
import * as React from "react";
import {
  getAfternoonOpeningTime,
  getLastTime,
  getMorningLastTime,
  getOpeningTime,
} from "../../domain/BusinessRule";
import useFormElementState from "../../features/hooks/useFormElementState";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";

type TimeTableProps = {
  value?: MenuSerializer;
  menus: MenuSerializer[];
  externalErrors?: string[];
  baseDate: Date;
  onSelect: (menu?: MenuSerializer) => void;
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

const TimeTable = React.memo((props: TimeTableProps) => {
  const { value, onSelect, externalErrors } = props;
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = React.useCallback(() => {
    if (!value) {
      addErrorMessage("予約日時を選択してください");
      return;
    }
    verify();
  }, [value, verify, addErrorMessage]);
  React.useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      addErrorMessage(externalErrors[0]);
    }
  }, [externalErrors]);
  return (
    <Box m={2}>
      <Box mb={2}>
        <TextField
          variant="outlined"
          value={value ? format(value.start_at, "yyyy年M月d日H時mm分") : ""}
          placeholder="予約日時"
          helperText="下の表から選択してください"
          onBlur={() => {
            validate();
          }}
          InputProps={{
            readOnly: true,
            endAdornment: state.isValid && <CheckMark />,
          }}
          error={state.errorMessages.length > 0}
        />
      </Box>
      <ErrorMessages messages={state.errorMessages} />
      {value ? (
        <Button
          color="default"
          variant="outlined"
          onClick={() => {
            onSelect(undefined);
            addErrorMessage("予約日時を選択してください");
          }}
        >
          日時を再度選択する
        </Button>
      ) : (
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {createTwoWeeks(props.baseDate).map((date) => (
                <TableCell
                  key={"header-date-" + format(date, "MM月dd日hh時mm分")}
                  align="center"
                  padding="none"
                >
                  {format(date, "MM/dd")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {createBusinessTimesEveryThirtyMinutes(props.baseDate).map((e) => (
              <TableRow key={"table-row-" + e.toString()}>
                <TableCell
                  key={"header-time-" + format(e, "HH:mm")}
                  align="center"
                  padding="none"
                >
                  {format(e, "HH:mm")}
                </TableCell>
                {createTwoWeeks(e).map((date) => {
                  const menu = props.menus.find(
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
                            verify();
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
      )}
    </Box>
  );
});

export default TimeTable;
