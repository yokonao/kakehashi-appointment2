import { createTheme, ThemeProvider } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router";
import { Redirect } from "react-router-dom";
import { MenusContextProvider } from "../features/hooks/useMenusContext";
import InternalMedicineFormContainer from "../features/internalMedicine/InternalMedicineFormContainer";
import KampoFormContainer from "../features/kampo/KampoFormContainer";
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
const App = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <MenusContextProvider>
            <Header />
            <Switch>
              <Route path="/form/internal_medicine">
                <InternalMedicineFormContainer />
              </Route>
              <Route path="/form/kampo">
                <KampoFormContainer />
              </Route>
              <Redirect to="/form/internal_medicine" />
            </Switch>
            <div className={classes.footer} />
          </MenusContextProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
