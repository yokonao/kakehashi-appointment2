import * as React from "react";
import Form from "../form/Form";
import { useMenusContext } from "../hooks/useMenusContext";

const KampoFormContainer = () => {
  const { kampoMenus, isLoading } = useMenusContext();
  return <Form menus={kampoMenus} isLoading={isLoading} />;
};

export default KampoFormContainer;
