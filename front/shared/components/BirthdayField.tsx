import { Box, TextField } from "@mui/material";
import { format, parse } from "date-fns";
import { useState, ChangeEvent } from "react";

type Props = {
  value: Date;
  onChanged: (date?: Date) => void;
};

const BirthdayField = (props: Props) => {
  const { value, onChanged } = props;
  const [rawValue, setRawValue] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  return (
    <Box m={2}>
      <TextField
        required
        id="birthday"
        value={value ? format(value, "yyyy年MM月dd日") : rawValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          const res = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(
            input
          );
          if (!res) {
            setRawValue(input);
            setErrorMessages([...errorMessages, "8桁の数字を入力してください"]);
            return;
          }
          const date = parse(input, "yyyyMMdd", new Date());
          if (isNaN(date.getTime())) {
            setRawValue(input);
            setErrorMessages([...errorMessages, "不正な日付です"]);
            return;
          }
          setErrorMessages([]);
          onChanged(date);
        }}
        label="生年月日"
        error={errorMessages.length > 0}
        disabled={!!value}
      />
    </Box>
  );
};

export default BirthdayField;
