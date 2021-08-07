import * as React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import TimeTable from "../../shared/components/TimeTable";
import { MenuSerializer, useMenusContext } from "../hooks/useMenusContext";
import { Field, FieldProps, Formik } from "formik";
import { format } from "date-fns";
import { PersonName } from "../../domain/personName";
import PersonNameField from "../../shared/components/PersonNameField";
import useStyles from "../../styles/useStyles";
import BirthdayFieldSimple from "../../shared/components/BirthdayFieldSimple";
import PhoneNumberInput from "../../shared/components/PhoneNumberInput";
import EmailInput from "../../shared/components/EmailInput";
import ConsultationReasonSelector from "../../shared/components/ConsultationReasonSelector";

const initialValues: {
  personName: PersonName;
  menu?: MenuSerializer;
  birthday?: Date;
  phoneNumber?: string;
  email?: string;
  reason: string[];
} = {
  personName: {
    firstName: "",
    lastName: "",
    firstKanaName: "",
    lastKanaName: "",
  },
  birthday: new Date(1990, 0, 1),
  reason: [],
};

const Form = () => {
  const classes = useStyles();
  const today = React.useMemo<Date>(() => new Date(), []);
  const { menus, isLoading } = useMenusContext();
  return (
    <Container className={classes.form} maxWidth="md">
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
              <Box py={2} my={2}>
                <Typography variant="h4" color="inherit">
                  内科外来予約
                </Typography>
              </Box>
              <Box py={2} my={2}>
                <Typography color="inherit">
                  1. 予約日時を選択してください
                </Typography>
              </Box>
              <Field name="menu">
                {({ field }: FieldProps<MenuSerializer>) => {
                  return (
                    <div>
                      <Box ml={2}>
                        <Typography color="inherit">
                          {field.value
                            ? format(field.value.start_at, "M月d日HH時mm分")
                            : ""}
                        </Typography>
                      </Box>
                      <TimeTable
                        menus={menus}
                        baseDate={today}
                        onSelect={onSelectMenu}
                      />
                    </div>
                  );
                }}
              </Field>
              <Box py={2} my={2}>
                <Typography color="inherit">
                  2. 氏名・生年月日を入力してください
                </Typography>
              </Box>
              <Field name="personName">
                {({ field }: FieldProps<PersonName>) => {
                  return (
                    <PersonNameField
                      value={field.value}
                      onChanged={(personName) =>
                        setFieldValue(field.name, personName)
                      }
                    />
                  );
                }}
              </Field>
              <Field name="birthday">
                {({ field }: FieldProps<Date>) => {
                  return (
                    <BirthdayFieldSimple
                      value={field.value}
                      onChanged={(date: Date) => {
                        setFieldValue(field.name, date);
                      }}
                    />
                  );
                }}
              </Field>
              <Box py={2} my={2}>
                <Typography color="inherit">
                  3. 電話番号・メールアドレスを入力してください
                </Typography>
              </Box>
              <Field name="phoneNumber">
                {({ field }: FieldProps<string>) => {
                  return (
                    <PhoneNumberInput
                      value={field.value}
                      onChanged={(value: string) => {
                        setFieldValue(field.name, value);
                      }}
                    />
                  );
                }}
              </Field>
              <Field name="email">
                {({ field }: FieldProps<string>) => {
                  return (
                    <EmailInput
                      value={field.value}
                      onChanged={(value: string) => {
                        setFieldValue(field.name, value);
                      }}
                    />
                  );
                }}
              </Field>
              <Box py={2} my={2}>
                <Typography color="inherit">
                  4. 受診理由に当てはまるものを全てチェックしてください
                </Typography>
              </Box>
              <Field name="reasons">
                {({ field }: FieldProps<string>) => {
                  return (
                    <ConsultationReasonSelector
                      value={[]}
                      onChanged={(value: string[]) => {
                        setFieldValue(field.name, value);
                      }}
                    />
                  );
                }}
              </Field>
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
    </Container>
  );
};

export default Form;
