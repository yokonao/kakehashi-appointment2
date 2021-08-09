import * as React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Icon,
  Typography,
} from "@material-ui/core";
import TimeTable from "../../shared/components/TimeTable";
import { useMenusContext } from "../hooks/useMenusContext";
import { Field, FieldProps, Formik } from "formik";
import { PersonName } from "../../domain/personName";
import PersonNameField from "../../shared/components/PersonNameInput";
import useStyles from "../../styles/useStyles";
import PhoneNumberInput from "../../shared/components/PhoneNumberInput";
import EmailInput from "../../shared/components/EmailInput";
import ConsultationReasonSelector from "../../shared/components/ConsultationReasonSelector";
import FreeCommentInput from "../../shared/components/FreeCommentInput";
import InstructionText from "../../shared/components/InstructionText";
import KarteInformationInput from "../../shared/components/KarteInformationInput";
import { KarteInformation } from "../../domain/KarteInformation";
import { PersonKanaName } from "../../domain/PersonKanaName";
import PersonKanaNameInput from "../../shared/components/PersonKanaNameInput";
import BirthdayInput from "../../shared/components/BirthdayInput";
import { MenuSerializer } from "../../serializers/MenuSerializer";

const initialValues: {
  personName: PersonName;
  personKanaName: PersonKanaName;
  menu?: MenuSerializer;
  birthday?: Date;
  phoneNumber?: string;
  email?: string;
  karteInformation: KarteInformation;
  reason?: string;
  freeComment?: string;
} = {
  personName: {
    firstName: "",
    lastName: "",
  },
  personKanaName: {
    firstKanaName: "",
    lastKanaName: "",
  },
  karteInformation: {
    isFirstVisit: true,
  },
};

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
  title: string;
};

const Form = (props: Props) => {
  const { menus, isLoading, title } = props;
  const classes = useStyles();
  const today = React.useMemo<Date>(() => new Date(), []);
  return (
    <Container className={classes.form} maxWidth="md">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue, submitForm }) => {
          const onSelectMenu = React.useCallback(
            (menu: MenuSerializer) => setFieldValue("menu", menu),
            [setFieldValue]
          );
          return (
            <>
              <Box py={2} my={2} textAlign="center">
                <Typography variant="h4" color="primary">
                  {title}
                </Typography>
              </Box>
              <InstructionText text="1. 予約日時を選択してください" />
              <Field name="menu">
                {({ field }: FieldProps<MenuSerializer>) => {
                  return (
                    <TimeTable
                      value={field.value}
                      menus={menus}
                      baseDate={today}
                      onSelect={onSelectMenu}
                    />
                  );
                }}
              </Field>
              <InstructionText text="2. 氏名を漢字とカタカナで入力してください" />
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
              <Field name="personKanaName">
                {({ field }: FieldProps<PersonKanaName>) => {
                  return (
                    <PersonKanaNameInput
                      value={field.value}
                      onChanged={(personKanaName) =>
                        setFieldValue(field.name, personKanaName)
                      }
                    />
                  );
                }}
              </Field>
              <InstructionText text="3. 生年月日を数字8ケタで入力してください" />
              <Field name="birthday">
                {({ field }: FieldProps<Date>) => {
                  return (
                    <BirthdayInput
                      value={field.value}
                      onChanged={(date: Date) => {
                        setFieldValue(field.name, date);
                      }}
                    />
                  );
                }}
              </Field>
              <InstructionText text="4. 電話番号・メールアドレスを入力してください" />
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
              <InstructionText text="5. 当院を初めてご利用になりますか？" />
              <Field name="karteInformation">
                {({ field }: FieldProps<KarteInformation>) => {
                  return (
                    <KarteInformationInput
                      value={field.value}
                      onChanged={(value: KarteInformation) => {
                        setFieldValue(field.name, value);
                      }}
                    />
                  );
                }}
              </Field>
              <InstructionText text="6. 受診理由として当てはまるものに全てチェックしてください" />
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
              <InstructionText text="7. その他（任意）" />
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
              <Box m={2} pb={10}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => submitForm()}
                  endIcon={<Icon>send</Icon>}
                >
                  予約
                </Button>
              </Box>
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
