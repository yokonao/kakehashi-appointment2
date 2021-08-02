import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";

const Form = () => {
  const [date, setDate] = React.useState(new Date());
  const today = React.useMemo<Date>(() => new Date(), []);
  return (
    <div>
      <h1>情報の入力</h1>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        <KeyboardDatePicker
          variant="inline"
          format="yyyy年MM月dd日"
          id="appointment-date"
          value={date}
          onChange={(date: Date) => setDate(date)}
          minDate={today}
          maxDate={new Date().setDate(today.getDate() + 14)}
        />
      </MuiPickersUtilsProvider>
      <div>
        <TextField required id="last_name" label="姓" variant="outlined" />
        <TextField required id="first_name" label="名" variant="outlined" />
      </div>
      <div>
        <TextField id="last_kana_name" label="セイ" variant="outlined" />
        <TextField id="first_kana_name" label="メイ" variant="outlined" />
      </div>
      <Button variant="contained" color="primary">
        予約
      </Button>
    </div>
  );
};

export default Form;
