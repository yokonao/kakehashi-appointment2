import * as React from "react";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import Form from "../form/Form";

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
};

const InternalMedicineFormContainer = (props: Props) => {
  const { menus, isLoading } = props;
  return <Form menus={menus} isLoading={isLoading} />;
};

export default InternalMedicineFormContainer;
