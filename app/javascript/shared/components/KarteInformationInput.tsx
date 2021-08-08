import { Box, TextField } from "@material-ui/core";
import * as React from "react";
import { KarteInformation } from "../../domain/KarteInformation";

type Props = {
  value: KarteInformation;
  onChanged: (value: KarteInformation) => void;
};

const KarteInformationInput = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <TextField
        value={value.clinicalNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged({ ...value, clinicalNumber: e.target.value });
        }}
        type="text"
        placeholder="000000000"
        helperText="診察券番号"
        variant="outlined"
        // inputModeをnumberにする
      />
    </Box>
  );
};

export default KarteInformationInput;
