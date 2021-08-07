import DateFnsUtils from "@date-io/date-fns";
import { Box } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import * as React from "react";

type Props = {
  value: Date;
  onChanged: (date: Date) => void;
};

const BirthdayFieldSimple = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        <KeyboardDatePicker
          variant="inline"
          format="yyyy年MM月dd日"
          id="birthday"
          value={value}
          onChange={(date: Date) => onChanged(date)}
          maxDate={new Date()}
          helperText="生年月日"
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default BirthdayFieldSimple;
