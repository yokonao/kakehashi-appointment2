import { Box, Button, ButtonGroup, TextField } from "@material-ui/core";
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
  const [baseDate, setBaseDate] = React.useState<Date>(new Date());
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
          <ButtonGroup size="small">
            <Button onClick={toPrev}>前</Button>
            <Button onClick={toNext}>次</Button>
          </ButtonGroup>
          <TimeTable
            baseDate={baseDate}
            menus={menus}
            onSelect={(menu: MenuSerializer) => {
              onSelect(menu);
              verify();
            }}
          />
        </Box>
      )}
    </Box>
  );
});

export default MenuSelector;
