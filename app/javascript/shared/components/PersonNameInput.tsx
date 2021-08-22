import { Box, Grid } from "@material-ui/core";
import * as React from "react";
import useFormElementState from "../../features/form/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import CustomTextField from "./CustomTextField";
import ErrorMessages from "./ErrorMessages";

type Props = {
  value: string;
  onChanged: (fullName: string) => void;
  externalErrors?: string[];
};

const PersonNameInput = (props: Props) => {
  const { value, onChanged, externalErrors } = props;
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = React.useCallback(() => {
    if (value.length == 0) {
      addErrorMessage("氏名を入力してください");
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
        required
        id="full_name"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        onBlur={() => {
          validate();
        }}
        inputProps={{ maxLength: 50 }}
        placeholder="架橋　花子"
        helperText="氏名"
        InputProps={{
          endAdornment: state.isValid && <CheckMark />,
        }}
        error={state.errorMessages.length > 0}
      />
      <ErrorMessages messages={state.errorMessages} />
    </Box>
  );
};

export default PersonNameInput;
