import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useMenusContext } from "./hooks/useMenusContext";
import InternalMedicineFormContainer from "./components/InternalMedicineFormContainer";
import KampoFormContainer from "./components/KampoFormContainer";
import DepartmentChoice from "./components/DepartmentChoice";

const Routes = () => {
  const { internalMedicineMenus, kampoMenus, isLoading } = useMenusContext();
  return (
    <Switch>
      <Route path="/" exact>
        <DepartmentChoice />
      </Route>
      <Route path="/form/internal_medicine" exact>
        <InternalMedicineFormContainer
          menus={internalMedicineMenus}
          isLoading={isLoading}
        />
      </Route>
      <Route path="/form/kampo" exact>
        <KampoFormContainer menus={kampoMenus} isLoading={isLoading} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
