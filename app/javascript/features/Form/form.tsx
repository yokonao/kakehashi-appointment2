import * as React from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";
import TimeTable from "../../shared/components/time_table";
import { useMenusContext } from "../hooks/useMenusContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const Form = () => {
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date());
  const today = React.useMemo<Date>(() => new Date(), []);
  const { menus, isLoading } = useMenusContext();
  console.log(menus);
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
      <TimeTable menus={menus} baseDate={today} />
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
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Form;
