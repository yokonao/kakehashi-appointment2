import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppointmentsContainer from "./components/AppointmentsContainer";
import MenuContainer from "./components/MenuContainer";

const Routes = () => {
  return (
    <Switch>
      <Route path="/admin/menus">
        <MenuContainer />
      </Route>
      <Route path="/admin/appointments">
        <AppointmentsContainer />
      </Route>
      <Route render={() => <Redirect to="/admin/menus" />} />
    </Switch>
  );
};

export default Routes;
