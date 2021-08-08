import { Box, Grid, TextField } from "@material-ui/core";
import * as React from "react";
import { PersonKanaName } from "../../domain/PersonKanaName";
import useFormElementState from "../../features/hooks/useFormElementState";

type Props = {
  value: PersonKanaName;
  onChanged: (personName: PersonKanaName) => void;
};

const PersonKanaNameInput = (props: Props) => {
  const { value, onChanged } = props;
  const { state, verify } = useFormElementState();
  return (
    <Box m={2}>
      <Grid container spacing={3}>
        <Grid item>
          <TextField
            required
            id="last_kana_name"
            value={value.lastKanaName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue: PersonKanaName = {
                ...value,
                lastKanaName: e.target.value,
              };
              onChanged(newValue);
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="カケハシ"
            helperText="セイ（カタカナ）"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="first_kana_name"
            value={value.firstKanaName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue: PersonKanaName = {
                ...value,
                firstKanaName: e.target.value,
              };
              onChanged(newValue);
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="ハナコ"
            helperText="メイ（カタカナ）"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonKanaNameInput;
