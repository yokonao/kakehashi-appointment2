import { Box, TextField } from "@material-ui/core";
import * as React from "react";

type Props = {
  value: string;
  onChanged: (value: string) => void;
};
const EmailInput = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <TextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        type="email"
        placeholder="test@example.com"
        helperText="メールアドレス"
        variant="outlined"
      />
    </Box>
  );
};

export default EmailInput;
