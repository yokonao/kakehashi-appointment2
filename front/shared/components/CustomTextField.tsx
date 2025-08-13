import { Grid, TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

const CustomTextField = (props: Props) => {
  return (
    <Grid size={{ xs: 12, md: 8, lg: 4 }}>
      <TextField variant="outlined" fullWidth {...props} />
    </Grid>
  );
};

export default CustomTextField;
