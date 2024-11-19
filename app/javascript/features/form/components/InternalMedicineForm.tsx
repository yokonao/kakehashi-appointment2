import * as React from "react";
import { Box, Button, Container, Icon, Typography } from "@mui/material";
import { Field, FieldProps, Formik } from "formik";
import PersonNameField from "../../../shared/components/PersonNameInput";
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
import { createAppointment } from "../../../shared/api/createAppointment";
import MenuSelector from "../../../shared/components/MenuSelector";
import { useNotification } from "../hooks/useNotification";
import LoadingIndicator from "./LoadingIndicator";
import SuccessDialog from "./SuccessDialog";
import { createPostParameters, initialValues } from "../utils/FormValue";
import { validate } from "../utils/validator";
import { useMenusContext } from "../hooks/useMenusContext";

const InternalMedicineForm = () => {
  const { internalMedicineMenus: menus, isLoading } = useMenusContext();
  const { addError, addInfo } = useNotification();
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <Container
      maxWidth="md"
      sx={{ backgroundColor: "#ffffff", borderRadius: 30 }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setStatus, resetForm }) => {
          const { isValid, errors: validationErrors } = validate(values, true);
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
                  内科外来予約
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
              <InstructionText text="2. 氏名" />
              <Field name="fullName">
                {({ field }: FieldProps<string>) => {
                  return (
                    <PersonNameField
                      value={field.value}
                      onChanged={(personName) =>
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
                      onChanged={(personKanaName) =>
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
                {({ field }: FieldProps<string>) => {
                  return (
                    <BirthdayInput
                      value={field.value}
                      onChanged={(date: string) => {
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
              <LoadingIndicator isLoading={isSubmitting || isLoading} />
              <SuccessDialog
                isOpen={isOpenSuccessDialog}
                onClose={() => setIsOpenSuccessDialog(false)}
              />
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

export default InternalMedicineForm;
