import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router";
import { MenusContextProvider } from "../features/hooks/useMenusContext";
import InternalMedicineFormContainer from "../features/internalMedicine/InternalMedicineFormContainer";
import Header from "../shared/components/Header";

const history = createBrowserHistory();
const App = (): JSX.Element => {
  return (
    <div>
      <Router history={history}>
        <MenusContextProvider>
          <Header />
          <Switch>
            <Route
              path="/form"
              component={InternalMedicineFormContainer}
            ></Route>
          </Switch>
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
