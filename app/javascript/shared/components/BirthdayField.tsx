import { Box, TextField } from "@material-ui/core";
import { format, parse } from "date-fns";
import * as React from "react";

type Props = {
  value: Date;
  onChanged: (date?: Date) => void;
};

const BirthdayField = (props: Props) => {
  const { value, onChanged } = props;
  const [rawValue, setRawValue] = React.useState("");
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

  return (
    <Box m={2}>
      <TextField
        required
        id="birthday"
        value={value ? format(value, "yyyy年MM月dd日") : rawValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          const res = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(
            input
          );
          if (!res) {
            setRawValue(input);
            setErrorMessages([...errorMessages, "8桁の数字を入力してください"]);
            return;
          }
          const date = parse(input, "yyyyMMdd", new Date())
          if (isNaN(date.getTime())) {
            setRawValue(input);
            setErrorMessages([...errorMessages, "不正な日付です"]);
            return;
          }
          setErrorMessages([]);
          onChanged(date);
        }}
        label="生年月日"
        variant="outlined"
        error={errorMessages.length > 0}
        disabled={!!value}
      />
    </Box>
  );
};

export default BirthdayField;
