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
import TimeTable from "../../shared/components/TimeTable";
import { MenuSerializer, useMenusContext } from "../hooks/useMenusContext";
import { Field, FieldProps, Formik } from "formik";
import { string } from "prop-types";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const initialValues: {
  first_name: string;
  last_name: string;
  menu?: MenuSerializer;
} = {
  first_name: "",
  last_name: "",
};

const Form = () => {
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date());
  const today = React.useMemo<Date>(() => new Date(), []);
  const { menus, isLoading } = useMenusContext();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue }) => {
        return (
          <>
            <h1>情報の入力</h1>
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
              <KeyboardDatePicker
                variant="inline"
                format="yyyy年MM月dd日"
                id="appointment-date"
                value={date}
                onChange={(date: Date) => setDate(date)}
                minDate={today}
                maxDate={new Date().setDate(today.getDate() + 14)}
              />
            </MuiPickersUtilsProvider> */}
            <Field name="menu">
              {({ field }: FieldProps<MenuSerializer>) => {
                console.log(field.value);
                return field.value ? (
                  <div>
                    予約日時: {format(field.value.start_at, "MM月dd日hh時mm分")}
                    <Button
                      color="primary"
                      onClick={() => setFieldValue(field.name, undefined)}
                    >
                      日時を選択する
                    </Button>
                  </div>
                ) : (
                  <TimeTable
                    menus={menus}
                    baseDate={today}
                    onSelect={(menu: MenuSerializer) => {
                      setFieldValue(field.name, menu);
                    }}
                  />
                );
              }}
            </Field>
            <div>
              <Field name="last_name">
                {({ field }: FieldProps<string>) => {
                  return (
                    <TextField
                      required
                      id="last_name"
                      value={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(field.name, e.target.value);
                      }}
                      label="姓"
                      variant="outlined"
                    />
                  );
                }}
              </Field>
              <Field name="first_name">
                {({ field }: FieldProps<string>) => {
                  return (
                    <TextField
                      required
                      id="first_name"
                      value={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(field.name, e.target.value);
                      }}
                      label="名"
                      variant="outlined"
                    />
                  );
                }}
              </Field>
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
          </>
        );
      }}
    </Formik>
  );
};

export default Form;
