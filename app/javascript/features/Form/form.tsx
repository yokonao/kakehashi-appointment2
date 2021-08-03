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
import TimeTable from "../../shared/components/TimeTable";
import { MenuSerializer, useMenusContext } from "../hooks/useMenusContext";
import { Field, FieldProps, Formik } from "formik";
import { format } from "date-fns";
import { number } from "prop-types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

type DateValue = {
  year?: number;
  month?: number;
  day?: number;
};

const initialValues: {
  first_name: string;
  last_name: string;
  first_kana_name: string;
  last_kana_name: string;
  menu?: MenuSerializer;
  date_value: DateValue;
} = {
  first_name: "",
  last_name: "",
  first_kana_name: "",
  last_kana_name: "",
  date_value: {
    year: undefined,
    month: undefined,
    day: undefined,
  },
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
        const onSelectMenu = React.useCallback(
          (menu: MenuSerializer) => setFieldValue("menu", menu),
          [setFieldValue]
        );
        return (
          <>
            <h1>情報の入力</h1>
            <Field name="menu">
              {({ field }: FieldProps<MenuSerializer>) => {
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
                    onSelect={onSelectMenu}
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
              <Field name="last_kana_name">
                {({ field }: FieldProps<string>) => {
                  return (
                    <TextField
                      required
                      id="last_kana_name"
                      value={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(field.name, e.target.value);
                      }}
                      label="セイ"
                      variant="outlined"
                    />
                  );
                }}
              </Field>
              <Field name="first_kana_name">
                {({ field }: FieldProps<string>) => {
                  return (
                    <TextField
                      required
                      id="first_kana_name"
                      value={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(field.name, e.target.value);
                      }}
                      label="メイ"
                      variant="outlined"
                    />
                  );
                }}
              </Field>
              <Field name="date_value">
                {({ field }: FieldProps<DateValue>) => {
                  return (
                    <div>
                      <TextField
                        required
                        id="birthday_year"
                        value={field.value.year}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(field.name, {
                            ...field.value,
                            year: e.target.value,
                          });
                        }}
                        label="年"
                        variant="outlined"
                      />
                      年
                      <TextField
                        required
                        id="birthday_month"
                        value={field.value.month}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(field.name, {
                            ...field.value,
                            month: e.target.value,
                          });
                        }}
                        label="月"
                        variant="outlined"
                      />
                      月
                      <TextField
                        required
                        id="birthday_day"
                        value={field.value.day}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(field.name, {
                            ...field.value,
                            day: e.target.value,
                          });
                        }}
                        label="日"
                        variant="outlined"
                      />
                      日
                    </div>
                  );
                }}
              </Field>
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
