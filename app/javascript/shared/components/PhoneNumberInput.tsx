import { Box } from "@mui/material";
import * as React from "react";
import useFormElementState from "../../features/form/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import CustomTextField from "./CustomTextField";
import ErrorMessages from "./ErrorMessages";

type Props = {
  value: string;
  onChanged: (value: string) => void;
  externalErrors?: string[];
};

const PhoneNumberInput = (props: Props) => {
  const { value, onChanged, externalErrors } = props;
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = React.useCallback(() => {
    if (!value || value.length == 0) {
      addErrorMessage("電話番号を入力してください");
      return;
    }
    if (!/^[0-9]+$/.test(value)) {
      addErrorMessage("ハイフン無し数字のみで入力してください");
      return;
    }
    verify();
  }, [value, verify, addErrorMessage]);
  React.useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      setExternalErrors(externalErrors);
    }
  }, [externalErrors]);

  return (
    <Box m={2}>
      <CustomTextField
        id="phone-number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        onBlur={() => {
          validate();
        }}
        inputProps={{ maxLength: 11 }}
        type="tel"
        placeholder="0524833377"
        helperText="電話番号（ハイフン無し）"
        InputProps={{
          endAdornment: state.isValid && <CheckMark />,
        }}
        error={state.errorMessages.length > 0}
      />
      <ErrorMessages messages={state.errorMessages} />
    </Box>
  );
};

export default PhoneNumberInput;
