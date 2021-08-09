import * as React from "react";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import Form from "../form/form";

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
};

const KampoFormContainer = (props: Props) => {
  const { menus, isLoading } = props;
  return <Form title="漢方外来予約" menus={menus} isLoading={isLoading} />;
};

export default KampoFormContainer;
