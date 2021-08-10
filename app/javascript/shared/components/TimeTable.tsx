import {
  Box,
  Button,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { format } from "date-fns";
import * as React from "react";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../domain/BusinessRule";
import useFormElementState from "../../features/hooks/useFormElementState";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";

type TimeTableProps = {
  value?: MenuSerializer;
  menus: MenuSerializer[];
  externalErrors?: string[];
  date: Date;
  onSelect: (menu?: MenuSerializer) => void;
};

const TimeTable = React.memo((props: TimeTableProps) => {
  const { value, menus, date, onSelect, externalErrors } = props;
  const [baseDate, setBaseDate] = React.useState<Date>(new Date());
  React.useEffect(() => setBaseDate(date), [date]);
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
      setExternalErrors(externalErrors);
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
        <Box>
          {/* <ButtonGroup size="small" aria-label="small outlined button group">
            <Button>前</Button>
            <Button>次</Button>
          </ButtonGroup> */}
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                {createDaysOnTheTime(baseDate, 14).map((date) => (
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
                  {createDaysOnTheTime(e, 14).map((date) => {
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
        </Box>
      )}
    </Box>
  );
});

export default TimeTable;
