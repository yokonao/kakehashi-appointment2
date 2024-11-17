import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import InternalMedicineFormContainer from "./components/InternalMedicineFormContainer";
import DepartmentChoice from "./components/DepartmentChoice";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <DepartmentChoice />
      </Route>
      <Route path="/form/internal_medicine" exact>
        <InternalMedicineFormContainer />
      </Route>
      {/* <Route path="/form/kampo" exact>
        <KampoFormContainer />
      </Route> */}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
