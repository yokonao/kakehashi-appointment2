import { Box, TextField } from "@material-ui/core";
import { format, parse } from "date-fns";
import * as React from "react";

type BirthdayFieldProps = {
  date: Date;
  onChanged: (date?: Date) => void;
};

const BirthdayField = (props: BirthdayFieldProps) => {
  const { date, onChanged } = props;
  const [value, setValue] = React.useState("");
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

  return (
    <Box m={2}>
      <TextField
        required
        id="birthday"
        value={date ? format(date, "yyyy年MM月dd日") : value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          const res = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(
            input
          );
          if (!res) {
            setValue(input);
            setErrorMessages([...errorMessages, "8桁の数字を入力してください"]);
            return;
          }
          const date = parse(input, "yyyyMMdd", new Date())
          if (isNaN(date.getTime())) {
            setValue(input);
            setErrorMessages([...errorMessages, "不正な日付です"]);
            return;
          }
          setErrorMessages([]);
          onChanged(date);
        }}
        label="生年月日"
        variant="outlined"
        error={errorMessages.length > 0}
        disabled={!!date}
      />
    </Box>
  );
};

export default BirthdayField;
