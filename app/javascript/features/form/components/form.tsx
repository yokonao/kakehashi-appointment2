import * as React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Typography
} from "@material-ui/core";
import { Field, FieldProps, Formik } from "formik";
import PersonNameField from "../../../shared/components/PersonNameInput";
import useStyles from "../../../styles/useStyles";
import PhoneNumberInput from "../../../shared/components/PhoneNumberInput";
import EmailInput from "../../../shared/components/EmailInput";
import ConsultationReasonSelector from "../../../shared/components/ConsultationReasonSelector";
import FreeCommentInput from "../../../shared/components/FreeCommentInput";
import InstructionText from "../../../shared/components/InstructionText";
import KarteInformationInput from "../../../shared/components/KarteInformationInput";
import { KarteInformation } from "../../../domain/KarteInformation";
import PersonKanaNameInput from "../../../shared/components/PersonKanaNameInput";
import BirthdayInput from "../../../shared/components/BirthdayInput";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import { format } from "date-fns";
import {
  createAppointment,
  CreateAppointmentParameters
} from "../../../shared/api/createAppointment";
import MenuSelector from "../../../shared/components/MenuSelector";
import { useNotification } from "../hooks/useNotification";
import { useMenusContext } from "../hooks/useMenusContext";
import LoadingForm from "./LoadingIndicator";
import { loadavg } from "os";
import { string } from "prop-types";

type FormValue = {
  fullName: string;
  fullKanaName: string;
  menu?: MenuSerializer;
  birthday?: Date;
  phoneNumber: string;
  email: string;
  karteInformation: KarteInformation;
  reason: string;
  freeComment: string;
};

const initialValues: FormValue = {
  phoneNumber: "",
  email: "",
  fullName: "",
  fullKanaName: "",
  karteInformation: {
    isFirstVisit: true,
    clinicalNumber: ""
  },
  reason: "",
  freeComment: ""
};

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
  title: string;
};

function validate(
  value: FormValue
): {
  isValid: boolean;
  errors: { [field: string]: string[] };
} {
  let errors: { [field: string]: string[] } = {};
  if (!value.menu) {
    errors["menu"] = ["予約日時を選択してください"];
  }
  if (value.fullName.length === 0) {
    errors["fullName"] = ["氏名を入力してください"];
  }
  if (
    value.fullKanaName.length === 0 ||
    !/^[ァ-ヶー－| |　]+$/.test(value.fullKanaName)
  ) {
    errors["fullKanaName"] = ["氏名をカタカナで入力してください"];
  }
  if (!value.birthday) {
    errors["birthday"] = ["生年月日を数字8ケタで入力してください"];
  }
  if (value.phoneNumber.length === 0) {
    errors["phoneNumber"] = ["電話番号を入力してください"];
  } else if (!/^[0-9]{10,11}$/.test(value.phoneNumber)) {
    errors["phoneNumber"] = [
      "不正な電話番号です。ハイフン無し数字のみで入力してください"
    ];
  }
  if (value.email.length === 0) {
    errors["email"] = ["メールアドレスを入力してください"];
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value.email
    )
  ) {
    errors["email"] = ["不正なメールアドレスです"];
  }

  if (!value.karteInformation.isFirstVisit) {
    if (
      value.karteInformation.clinicalNumber.length > 0 &&
      !/^[0-9]{5}$/.test(value.karteInformation.clinicalNumber)
    ) {
      // 診察券番号が入力済みで数字5ケタでない場合はエラー
      errors["karteInformation"] = ["診察券番号は数字5ケタで入力してください"];
    }
  }

  if (value.reason.length === 0) {
    errors["reason"] = ["受診理由を最低1つ選択してください"];
  }
  const isValid =
    Object.keys(errors)
      .map(key => errors[key])
      .reduce((a, b) => [...a, ...b], []).length == 0;

  return { isValid: isValid, errors: errors };
}

function createPostParameters(value: FormValue): CreateAppointmentParameters {
  return {
    full_name: value.fullName,
    full_kana_name: value.fullKanaName,
    birthday: value.birthday ? format(value.birthday, "yyyy-MM-dd") : "",
    is_first_visit: value.karteInformation.isFirstVisit.toString(),
    clinical_number: value.karteInformation.isFirstVisit
      ? ""
      : value.karteInformation.clinicalNumber,
    email: value.email,
    phone_number: value.phoneNumber,
    reason: value.reason,
    free_comment: value.freeComment,
    menu_id: value.menu ? value.menu.id.toString() : ""
  };
}

const Form = (props: Props) => {
  const { menus, isLoading, title } = props;
  const classes = useStyles();
  const { addError, addInfo } = useNotification();
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  return (
    <Container className={classes.form} maxWidth="md">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setStatus, resetForm }) => {
          const { isValid, errors: validationErrors } = validate(values);
          if (isValid) {
            const params = createPostParameters(values);
            setIsSubmitting(true);
            const { success, errors } = await createAppointment(params);
            setIsSubmitting(false);
            if (success) {
              addInfo("予約が成立しました");
              window.scrollTo(0, 0);
              resetForm();
              setIsOpenSuccessDialog(true);
            } else {
              setStatus(errors);
              window.scrollTo(0, 0);
              addError(
                "予約が成立しませんでした。再度お試しいただくか、お電話でお問い合わせください"
              );
            }
          } else {
            setStatus(validationErrors);
            window.scrollTo(0, 0);
            addError(
              "予約フォーム送信に失敗しました。エラーを確認してください"
            );
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
              <InstructionText text="1. 予約日時" />
              <Field name="menu">
                {({ field }: FieldProps<MenuSerializer>) => {
                  return (
                    <MenuSelector
                      value={field.value}
                      menus={menus}
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                      onSelect={onSelectMenu}
                    />
                  );
                }}
              </Field>
              <InstructionText text="2. 氏名（漢字・カタカナ）" />
              <Field name="fullName">
                {({ field }: FieldProps<string>) => {
                  return (
                    <PersonNameField
                      value={field.value}
                      onChanged={personName =>
                        setFieldValue(field.name, personName)
                      }
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                    />
                  );
                }}
              </Field>
              <Field name="fullKanaName">
                {({ field }: FieldProps<string>) => {
                  return (
                    <PersonKanaNameInput
                      value={field.value}
                      onChanged={personKanaName =>
                        setFieldValue(field.name, personKanaName)
                      }
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                    />
                  );
                }}
              </Field>
              <InstructionText text="3. 生年月日・電話番号・メールアドレス" />
              <Field name="birthday">
                {({ field }: FieldProps<Date>) => {
                  return (
                    <BirthdayInput
                      value={field.value}
                      onChanged={(date: Date) => {
                        setFieldValue(field.name, date);
                      }}
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                    />
                  );
                }}
              </Field>
              <Field name="phoneNumber">
                {({ field }: FieldProps<string>) => {
                  return (
                    <PhoneNumberInput
                      value={field.value}
                      onChanged={(value: string) => {
                        setFieldValue(field.name, value);
                      }}
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
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
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                    />
                  );
                }}
              </Field>
              <InstructionText text="4. 当院を初めてご利用になりますか？" />
              <Field name="karteInformation">
                {({ field }: FieldProps<KarteInformation>) => {
                  return (
                    <KarteInformationInput
                      value={field.value}
                      onChanged={(value: KarteInformation) => {
                        setFieldValue(field.name, value);
                      }}
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                    />
                  );
                }}
              </Field>
              <InstructionText text="5. 受診理由（複数選択可）" />
              <Field name="reason">
                {({ field }: FieldProps<string>) => {
                  return (
                    <ConsultationReasonSelector
                      onChanged={(value: string) => {
                        setFieldValue(field.name, value);
                      }}
                      externalErrors={
                        errorFields ? errorFields[field.name] : undefined
                      }
                    />
                  );
                }}
              </Field>
              <InstructionText text="6. その他（任意）" />
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
              <LoadingForm
                menus={menus}
                isLoading={isLoading}
                title={title}
              ></LoadingForm>
              <Dialog open={isOpenSuccessDialog}>
                <DialogTitle>予約が成立しました</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    この度は、かけはし糖尿病・甲状腺クリニックをご予約いただきましてありがとうございます。
                    ご入力いただいたメールアドレスに確認メールを送付しています。
                  </DialogContentText>
                  <DialogContentText>
                    メールが届かない場合はお手数ですが電話にてお問い合わせください。
                    当日のご来院をお待ちしています。
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setIsOpenSuccessDialog(false);
                      window.open("/form/internal_medicine", "_self");
                    }}
                    color="primary"
                  >
                    確認しました
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Form;
