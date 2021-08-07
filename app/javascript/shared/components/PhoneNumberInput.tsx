import { Box, TextField } from "@material-ui/core";
import * as React from "react";

type Props = {
  value: string;
  onChanged: (value: string) => void;
};

const PhoneNumberInput = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <TextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        inputProps={{ maxLength: 11, pattern: "\A[0-9]{10, 11}\z" }}
        type="tel"
        placeholder="0524833377"
        helperText="電話番号（ハイフン無し）"
        variant="outlined"
        />
    </Box>
  );
};

export default PhoneNumberInput;
