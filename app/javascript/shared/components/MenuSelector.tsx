import { Box, Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import { addDays, format, subDays } from "date-fns";
import * as React from "react";
import useFormElementState from "../../features/hooks/useFormElementState";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";
import TimeTable from "./TimeTable";

type Props = {
  value?: MenuSerializer;
  menus: MenuSerializer[];
  externalErrors?: string[];
  onSelect: (menu?: MenuSerializer) => void;
};

const MenuSelector = React.memo((props: Props) => {
  const { value, menus, onSelect, externalErrors } = props;
  const tomorrow = React.useMemo(() => addDays(new Date(), 1), []);
  const [baseDate, setBaseDate] = React.useState<Date>(tomorrow);
  const minDate = React.useMemo(() => tomorrow, [tomorrow]);
  const maxDate = React.useMemo(() => addDays(tomorrow, 14), [tomorrow]); // 予約を取れるのは2週間先まで
  const daysPerPage = React.useMemo(() => 14, []);
  const enabledPrevButton = React.useMemo(
    () => baseDate.getTime() > minDate.getTime(),
    [baseDate, minDate]
  );
  const enabledNextButton = React.useMemo(
    () => addDays(baseDate, daysPerPage).getTime() < maxDate.getTime(),
    [baseDate, daysPerPage, maxDate]
  );
  const toNext = React.useCallback(
    () => setBaseDate(addDays(baseDate, 14)),
    [baseDate, setBaseDate]
  );
  const toPrev = React.useCallback(
    () => setBaseDate(subDays(baseDate, 14)),
    [baseDate, setBaseDate]
  );
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
          <Grid container justifyContent="space-between">
            <Button
              onClick={toPrev}
              variant="outlined"
              disabled={!enabledPrevButton}
            >
              前へ
            </Button>
            <Button
              onClick={toNext}
              variant="outlined"
              disabled={!enabledNextButton}
            >
              次へ
            </Button>
          </Grid>
          <TimeTable
            baseDate={baseDate}
            menus={menus}
            onSelect={(menu: MenuSerializer) => {
              onSelect(menu);
              verify();
            }}
            days={14}
          />
        </Box>
      )}
    </Box>
  );
});

export default MenuSelector;
