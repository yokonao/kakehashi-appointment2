import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import { useAdminStyles } from "../styles/useAdminStyles";

const LoadingIndicator = () => {
  const classes = useAdminStyles();
  const { isLoading } = useAdminContext();
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingIndicator;
