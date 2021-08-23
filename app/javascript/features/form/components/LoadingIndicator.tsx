import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useStyles from "../../../styles/useStyles";

type PropsLoading = {
  isLoading: boolean;
};

const LoadingForm = (props: PropsLoading) => {
  const classes = useStyles();
  const isLoading = props.isLoading;
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingForm;
