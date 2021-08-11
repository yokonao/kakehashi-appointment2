import {
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { NotificationContextProvider } from "../features/hooks/useNotification";
import client from "../shared/api/client";
import Header from "../shared/components/Header";
import useStyles from "../styles/useStyles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#99720f",
    },
  },
});

const history = createBrowserHistory();
const Admin = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <NotificationContextProvider>
            <Header />
            <Switch>
              <Route path="/admin/dashboard">
                <Typography variant="h1">ダッシュボード</Typography>
              </Route>
            </Switch>
            <Button
              variant="contained"
              onClick={async () => {
                await client.delete("/administrators/sign_out");
                window.location.href = "/administrators/sign_in";
              }}
            >
              ログアウト
            </Button>
            <div className={classes.footer} />
          </NotificationContextProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Admin />,
    document.body.appendChild(document.createElement("div"))
  );
});
