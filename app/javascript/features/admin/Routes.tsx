import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import { Typography } from "@material-ui/core";
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
      <Route path="/admin/*">
        <Typography>ダッシュボード</Typography>
      </Route>
    </Switch>
  );
};

export default Routes;
