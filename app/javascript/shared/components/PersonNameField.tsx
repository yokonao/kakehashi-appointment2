import { Box, Grid, Icon, InputAdornment, TextField } from "@material-ui/core";
import { validateYupSchema } from "formik";
import * as React from "react";
import { PersonName } from "../../domain/PersonName";
import useFormElementState from "../../features/hooks/useFormElementState";
import CheckMark from "./CheckMark";

type Props = {
  value: PersonName;
  onChanged: (personName: PersonName) => void;
};

const PersonNameField = (props: Props) => {
  const { value, onChanged } = props;
  const { state, verify } = useFormElementState();
  const validate = React.useCallback(() => {
    if (value.firstName.length > 0 && value.lastName.length > 0) verify();
  }, [value, verify]);
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
            onBlur={() => {
              if (value.firstName.length > 0) validate();
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="架橋"
            helperText="姓（漢字）"
            variant="outlined"
            InputProps={{
              endAdornment: state.isValid && <CheckMark />,
            }}
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
            onBlur={() => {
              if (value.lastName.length > 0) validate();
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="花子"
            helperText="名（漢字）"
            variant="outlined"
            InputProps={{
              endAdornment: state.isValid && <CheckMark />,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonNameField;
