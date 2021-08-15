import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import { Typography } from "@material-ui/core";
import AppointmentsContainer from "./components/AppointmentsContainer";

const Routes = () => {
  return (
    <Switch>
      <Route path="/admin/menus">
        <Typography>予約枠</Typography>
      </Route>
      <Route path="/admin/appointments">
        <Typography>予約一覧</Typography>
        <AppointmentsContainer />
      </Route>
      <Route path="/admin/*">
        <Typography>ダッシュボード</Typography>
      </Route>
    </Switch>
  );
};

export default Routes;
