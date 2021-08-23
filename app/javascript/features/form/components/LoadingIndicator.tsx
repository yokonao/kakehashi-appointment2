import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useStyles from "../../../styles/useStyles";
import { MenuSerializer } from "../../../serializers/MenuSerializer";

type PropsLoading = {
  menus: MenuSerializer[];
  isLoading: boolean;
  title: string;
};

const LoadingForm = (props: PropsLoading) => {
  const classes = useStyles();
  const isLoading = props.isLoading;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  return (
    <Backdrop className={classes.backdrop} open={isSubmitting || isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingForm;
