import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#fff8e6",
    },
    footer: {
      height: 300,
    },
    form: {
      backgroundColor: "#ffffff",
      borderRadius: 30,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default useStyles;
