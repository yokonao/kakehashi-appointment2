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

type FormValue = {
  personName: PersonName;
  personKanaName: PersonKanaName;
  menu?: MenuSerializer;
  birthday?: Date;
  phoneNumber?: string;
  email?: string;
  karteInformation: KarteInformation;
  reason?: string;
  freeComment?: string;
};

const initialValues: FormValue = {
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

function validate(value: FormValue): {
  isValid: boolean;
  errors: { [field: string]: string[] };
} {
  let errors: { [field: string]: string[] } = {};
  if (!value.menu) {
    errors["menu"] = ["予約日時を選択してください"];
  }
  if (
    value.personName.firstName.length == 0 ||
    value.personName.lastName.length == 0
  ) {
    errors["personName"] = ["氏名を入力してください"];
  }
  if (
    value.personKanaName.firstKanaName.length == 0 ||
    value.personKanaName.lastKanaName.length == 0 ||
    !/^[ァ-ヶー－]+$/.test(value.personKanaName.firstKanaName) ||
    !/^[ァ-ヶー－]+$/.test(value.personKanaName.lastKanaName)
  ) {
    errors["personKanaName"] = ["氏名をカタカナで入力してください"];
  }
  if (!value.birthday) {
    errors["birthday"] = ["生年月日を数字8ケタで入力してください"];
  }
  if (!value.phoneNumber || value.phoneNumber.length == 0) {
    errors["phoneNumber"] = ["電話番号を入力してください"];
  } else if (!/^[0-9]{10,11}$/.test(value.phoneNumber)) {
    errors["phoneNumber"] = [
      "不正な電話番号です。ハイフン無し数字のみで入力してください",
    ];
  }
  if (!value.email || value.email.length == 0) {
    errors["email"] = ["メールアドレスを入力してください"];
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value.email
    )
  ) {
    errors["email"] = ["不正なメールアドレスです"];
  }

  // [Note] カルテ情報はあえてバリデーションをかけない
  // 再診だが診察券番号がわからない人を想定している

  const isValid =
    Object.keys(errors)
      .map((key) => errors[key])
      .reduce((a, b) => [...a, ...b]).length == 0;

  return { isValid: isValid, errors: errors };
}

const Form = (props: Props) => {
  const { menus, isLoading, title } = props;
  const classes = useStyles();
  const today = React.useMemo<Date>(() => new Date(), []);
  return (
    <Container className={classes.form} maxWidth="md">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setStatus }) => {
          console.log(values);
          console.log(validate(values));
          const res = validate(values);
          if (res.isValid) {
            // TODO api通信
          } else {
            setStatus(res.errors);
          }
        }}
      >
        {({ status, setFieldValue, submitForm }) => {
          const onSelectMenu = React.useCallback(
            (menu: MenuSerializer) => setFieldValue("menu", menu),
            [setFieldValue]
          );
          const errorFields = status as { [field: string]: string[] };
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
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
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
