import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useStyles from "../../../styles/useStyles";

type PropsLoading = {
  isLoading: boolean;
  isSubmitting: boolean;
};

const LoadingForm = (props: PropsLoading) => {
  const classes = useStyles();
  const isLoading = props.isLoading;
  const isSubmitting = props.isSubmitting;
  return (
    <Backdrop className={classes.backdrop} open={isSubmitting || isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingForm;
