import { Box, TextField } from "@material-ui/core";
import * as React from "react";
import useFormElementState from "../../features/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";

type Props = {
  value: string;
  onChanged: (value: string) => void;
};
const EmailInput = (props: Props) => {
  const { value, onChanged } = props;
  const { state, verify, addErrorMessage } = useFormElementState();
  const validate = React.useCallback(() => {
    if (!value || value.length == 0) {
      addErrorMessage("メールアドレスを入力してください");
      return;
    }
    // TODO メールアドレスのバリデーションはちゃんと考えてテストしなければならない
    if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      addErrorMessage("不正なメールアドレスです");
      return;
    }
    verify();
  }, [value, verify, addErrorMessage]);
  return (
    <Box m={2}>
      <TextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        onBlur={() => {
          validate();
        }}
        type="email"
        placeholder="test@example.com"
        helperText="メールアドレス"
        variant="outlined"
        InputProps={{
          endAdornment: state.isValid && <CheckMark />,
        }}
        error={state.errorMessages.length > 0}
      />
      <ErrorMessages messages={state.errorMessages} />
    </Box>
  );
};

export default EmailInput;
