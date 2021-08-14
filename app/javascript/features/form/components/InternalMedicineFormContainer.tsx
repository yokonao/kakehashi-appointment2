import * as React from "react";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import Form from "./form";

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
};

const InternalMedicineFormContainer = (props: Props) => {
  const { menus, isLoading } = props;
  return <Form title="内科外来予約" menus={menus} isLoading={isLoading} />;
};

export default InternalMedicineFormContainer;
