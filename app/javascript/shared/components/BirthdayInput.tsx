import DateFnsUtils from "@date-io/date-fns";
import { Box, TextField } from "@material-ui/core";
import { parse } from "date-fns";

import * as React from "react";
import useFormElementState from "../../features/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";

type Props = {
  value: Date;
  onChanged: (date: Date) => void;
};

const BirthdayInput = (props: Props) => {
  const { onChanged } = props;
  const [value, setValue] = React.useState("");
  const { state, verify, addErrorMessage } = useFormElementState();
  const validate = React.useCallback(() => {
    if (value.length == 0) {
      addErrorMessage("生年月日を入力してください");
      return;
    }
    if (!/^[0-9]{8}$/.test(value)) {
      addErrorMessage("数字8桁で入力してください");
      return;
    }
    const date = parse(value, "yyyyMMdd", new Date());
    if (date.toString() === "Invalid Date") {
      addErrorMessage("無効な日付です");
      return;
    }
    verify();
  }, [value, verify, addErrorMessage]);

  return (
    <Box m={2}>
      <TextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
        onBlur={() => {
          validate();
          if (state.isValid) onChanged(parse(value, "yyyyMMdd", new Date()));
        }}
        type="tel"
        placeholder="19850603"
        helperText="入力例. 1990年1月1日生 → 19900101"
        variant="outlined"
        inputProps={{ maxLength: 8 }}
        InputProps={{
          endAdornment: state.isValid && <CheckMark />,
        }}
        error={state.errorMessages.length > 0}
      />
      <ErrorMessages messages={state.errorMessages} />
    </Box>
  );
};

export default BirthdayInput;
