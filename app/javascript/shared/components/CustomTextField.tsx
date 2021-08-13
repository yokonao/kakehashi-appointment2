import { Grid, TextField, TextFieldProps } from "@material-ui/core";
import * as React from "react";

type Props = TextFieldProps;

const CustomTextField = (props: Props) => {
  return (
    <Grid item xs={12} md={8} lg={4}>
        <TextField variant="outlined" fullWidth {...props} />
    </Grid>
  );
};

export default CustomTextField;
