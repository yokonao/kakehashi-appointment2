import { TextField, TextFieldProps } from "@material-ui/core";
import * as React from "react";

type Props = TextFieldProps;

const CustomTextField = (props: Props) => {
  return <TextField variant="outlined" {...props} />;
};

export default CustomTextField;
