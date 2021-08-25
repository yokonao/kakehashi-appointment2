import * as React from "react";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import InternalMedicineForm from "./InternalMedicineForm";

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
};

const InternalMedicineFormContainer = (props: Props) => {
  const { menus, isLoading } = props;
  return <InternalMedicineForm menus={menus} isLoading={isLoading} />;
};

export default InternalMedicineFormContainer;
