import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "../features/form/Routes";
import { MenusContextProvider } from "../features/form/hooks/useMenusContext";
import { NotificationContextProvider } from "../features/form/hooks/useNotification";
import Header from "../shared/components/Header";
import useStyles from "../styles/useStyles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#99720f",
    },
  },
});

const App = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NotificationContextProvider>
            <MenusContextProvider>
              <Header />
              <Routes />
              <div className={classes.footer} />
            </MenusContextProvider>
          </NotificationContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
