import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router";
import { MenusContextProvider } from "../features/hooks/useMenusContext";
import InternalMedicineFormContainer from "../features/internalMedicine/InternalMedicineFormContainer";
import Header from "../shared/components/Header";
import useStyles from "../styles/useStyles";

// // 追記
// const theme = createTheme({
//   // palette: {
//   //   primary: {
//   //     main: teal[500],
//   //   },
//   //   secondary: {
//   //     main: "#00bcd4",
//   //   },
//   // },
// });

const history = createBrowserHistory();
const App = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <MenusContextProvider>
          <Header />
          <Switch>
            <Route
              path="/form"
              component={InternalMedicineFormContainer}
            ></Route>
          </Switch>
          <div className={classes.footer} />
        </MenusContextProvider>
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
