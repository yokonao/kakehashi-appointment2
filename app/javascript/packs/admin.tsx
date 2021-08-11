import { createTheme, ThemeProvider } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { NotificationContextProvider } from "../features/hooks/useNotification";
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
            {/* <Routes /> */}
            管理画面
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
