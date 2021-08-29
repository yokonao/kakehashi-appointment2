import {
  CardContent,
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardHeader,
  CardActions,
  Button
} from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: "center",
      background: "#b8860b",
      color: "#ffda89"
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const LoginContainer = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title="ログイン画面" />
      <CardContent>
        <div>
          <TextField
            fullWidth
            id="username"
            type="email"
            label="メールアドレス"
            placeholder="Username"
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            type="password"
            label="パスワード"
            placeholder="Password"
            margin="normal"
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.loginBtn}
        >
          ログイン
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginContainer;
