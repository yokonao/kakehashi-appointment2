import { Box, Grid, TextField } from "@material-ui/core";
import * as React from "react";
import { PersonName } from "../../domain/PersonName";

type Props = {
  value: PersonName;
  onChanged: (personName: PersonName) => void;
};

const PersonNameField = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <Grid container spacing={3}>
        <Grid item>
          <TextField
            required
            id="last_name"
            value={value.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue: PersonName = {
                ...value,
                lastName: e.target.value,
              };
              onChanged(newValue);
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="架橋"
            helperText="姓（漢字）"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="first_name"
            value={value.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue: PersonName = {
                ...value,
                firstName: e.target.value,
              };
              onChanged(newValue);
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="花子"
            helperText="名（漢字）"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonNameField;
