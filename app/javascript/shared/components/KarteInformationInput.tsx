import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { KarteInformation } from "../../domain/KarteInformation";

type Props = {
  value: KarteInformation;
  onChanged: (value: KarteInformation) => void;
};

const KarteInformationInput = (props: Props) => {
  const { value, onChanged } = props;
  const handleRadioChange = (newValue: string) => {
    if (newValue === "yes") {
      onChanged({ ...value, isFirstVisit: true });
    } else {
      onChanged({ ...value, isFirstVisit: false });
    }
  };
  return (
    <Box m={2}>
      <RadioGroup
        name="whether_first_visit"
        value={value.isFirstVisit ? "yes" : "no"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleRadioChange(e.target.value)
        }
      >
        <FormControlLabel
          tabIndex={0}
          value="yes"
          control={<Radio color="primary" />}
          label="はい"
        />
        <FormControlLabel
          tabIndex={0}
          value="no"
          control={<Radio color="primary" />}
          label="いいえ（再診の方は5ケタの診察券番号を入力してください）"
        />
      </RadioGroup>
      {!value.isFirstVisit && (
        <TextField
          value={value.clinicalNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChanged({ ...value, clinicalNumber: e.target.value });
          }}
          type="tel"
          placeholder="00028"
          helperText="診察券番号"
          variant="outlined"
          disabled={value.isFirstVisit}
        />
      )}
    </Box>
  );
};

export default KarteInformationInput;
