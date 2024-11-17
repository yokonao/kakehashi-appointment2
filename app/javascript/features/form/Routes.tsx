import * as React from "react";
import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import InternalMedicineFormContainer from "./components/InternalMedicineFormContainer";
import DepartmentChoice from "./components/DepartmentChoice";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<DepartmentChoice />} />
      <Route
        path="/form/internal_medicine"
        element={<InternalMedicineFormContainer />}
      />
      <Route element={<Navigate to="/" replace />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
