import * as React from "react";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import KampoForm from "./KampoForm";

type Props = {
  menus: MenuSerializer[];
  isLoading: boolean;
};

const KampoFormContainer = (props: Props) => {
  const { menus, isLoading } = props;
  return <KampoForm menus={menus} isLoading={isLoading} />;
};

export default KampoFormContainer;
