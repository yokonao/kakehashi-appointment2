import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useMenusContext } from "../hooks/useMenusContext";
import InternalMedicineFormContainer from "../internalMedicine/InternalMedicineFormContainer";
import KampoFormContainer from "../kampo/KampoFormContainer";

const Routes = () => {
  const { internalMedicineMenus, kampoMenus, isLoading } = useMenusContext();
  return (
    <Switch>
      <Route path="/form/internal_medicine">
        <InternalMedicineFormContainer
          menus={internalMedicineMenus}
          isLoading={isLoading}
        />
      </Route>
      <Route path="/form/kampo">
        <KampoFormContainer menus={kampoMenus} isLoading={isLoading} />
      </Route>
      <Redirect to="/form/internal_medicine" />
    </Switch>
  );
};

export default Routes;
