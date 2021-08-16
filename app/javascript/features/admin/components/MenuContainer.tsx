import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { format, startOfWeek, addDays } from "date-fns";
import { ja } from "date-fns/locale";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    border: "thick double #99720f",
    height: 500,
    width: 120
  },
  control: {
    padding: theme.spacing(1)
  }
}));

const MenuContainer = () => {
  const classes = useStyles();
  const [date, setDate] = React.useState<Date>(new Date());
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" spacing={0}>
          {[0, 1, 2, 3, 4, 5, 6].map(value => (
            <Grid key={value} item>
              <Paper className={classes.paper}>
                <Typography>
                  {format(addDays(startOfWeek(date), value), "MM/dd　(E)", {
                    locale: ja
                  })}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MenuContainer;
