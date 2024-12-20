import { Box } from "@mui/material";
import useFormElementState from "../../features/form/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";
import CustomTextField from "./CustomTextField";
import { useCallback, useEffect } from "react";

type Props = {
  value: string;
  onChanged: (fullKanaName: string) => void;
  externalErrors?: string[];
};

function validateKana(target: string) {
  return target.length > 0 && /^[ァ-ヶー－ |　|]+$/.test(target);
}

const PersonKanaNameInput = (props: Props) => {
  const { value, onChanged, externalErrors } = props;
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = useCallback(() => {
    if (validateKana(value)) {
      verify();
    } else if (value.length == 0) {
      addErrorMessage("氏名をカタカナで入力してください");
    } else {
      addErrorMessage("カタカナで入力してください");
    }
  }, [value, verify, addErrorMessage]);
  useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      setExternalErrors(externalErrors);
    }
  }, [externalErrors]);

  return (
    <Box m={2}>
      <CustomTextField
        required
        id="full_kana_name"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        onBlur={() => {
          validate();
        }}
        inputProps={{ maxLength: 50 }}
        placeholder="カケハシ　ハナコ"
        helperText="カナ"
        InputProps={{
          endAdornment: state.isValid && <CheckMark />,
        }}
        error={state.errorMessages.length > 0}
      />
      <ErrorMessages messages={state.errorMessages} />
    </Box>
  );
};

export default PersonKanaNameInput;
