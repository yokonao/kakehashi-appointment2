import React from "react";
import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import AppointmentsContainer from "./components/AppointmentsContainer";
import MenuContainer from "./components/MenuContainer";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/admin/menus" element={<MenuContainer />} />
      <Route path="/admin/appointments" element={<AppointmentsContainer />} />
      <Route element={<Navigate to="/admin/menus" replace />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
