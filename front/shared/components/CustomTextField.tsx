import { Grid2, TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

const CustomTextField = (props: Props) => {
  return (
    <Grid2 size={{ xs: 12, md: 8, lg: 4 }}>
      <TextField variant="outlined" fullWidth {...props} />
    </Grid2>
  );
};

export default CustomTextField;
