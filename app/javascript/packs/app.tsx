import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router";
import Form from "../features/form/Form"

const history = createBrowserHistory();
const App = (): JSX.Element => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/form" component={Form}></Route>
        </Switch>
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
