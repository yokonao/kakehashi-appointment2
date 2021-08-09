import * as React from "react";
import Form from "../form/Form";
import { useMenusContext } from "../hooks/useMenusContext";

const InternalMedicineFormContainer = () => {
  const { internalMedicineMenus, isLoading } = useMenusContext();
  return <Form menus={internalMedicineMenus} isLoading={isLoading} />;
};

export default InternalMedicineFormContainer;
