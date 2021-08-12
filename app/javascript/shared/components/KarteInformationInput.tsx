import { Box, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import * as React from "react";
import { KarteInformation } from "../../domain/KarteInformation";
import CustomTextField from "./CustomTextField";

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
          value="yes"
          control={<Radio color="primary" />}
          label="はい"
        />
        <FormControlLabel
          value="no"
          control={<Radio color="primary" />}
          label="いいえ"
        />
      </RadioGroup>
      {!value.isFirstVisit && (
        <CustomTextField
          value={value.clinicalNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChanged({ ...value, clinicalNumber: e.target.value });
          }}
          type="tel"
          placeholder="00028"
          helperText="再診の方は5ケタの診察券番号を入力してください"
          inputProps={{ maxLength: 5 }}
          />
      )}
    </Box>
  );
};

export default KarteInformationInput;
