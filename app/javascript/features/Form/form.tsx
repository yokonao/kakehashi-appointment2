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
import FreeCommentInput from "../../shared/components/FreeCommentInput";
import InstructionText from "../../shared/components/InstructionText";

const initialValues: {
  personName: PersonName;
  menu?: MenuSerializer;
  birthday?: Date;
  phoneNumber?: string;
  email?: string;
  reason?: string;
  freeComment?: string;
} = {
  personName: {
    firstName: "",
    lastName: "",
    firstKanaName: "",
    lastKanaName: "",
  },
  birthday: new Date(1990, 0, 1),
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
              <InstructionText text="1. 予約日時を選択してください" />
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
              <InstructionText text="2. 氏名・生年月日を入力してください" />
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
              <InstructionText text="3. 電話番号・メールアドレスを入力してください" />
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
              <InstructionText text="4. 受診理由に当てはまるものを全てチェックしてください" />
              <Field name="reasons">
                {({ field }: FieldProps<string>) => {
                  return (
                    <ConsultationReasonSelector
                      onChanged={(value: string) => {
                        setFieldValue(field.name, value);
                      }}
                    />
                  );
                }}
              </Field>
              <InstructionText text="5. 医師に伝えておきたいことを記入してください（任意）" />
              <Field name="freeComment">
                {({ field }: FieldProps<string>) => {
                  return (
                    <FreeCommentInput
                      value={field.value}
                      onChanged={(value: string) => {
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
