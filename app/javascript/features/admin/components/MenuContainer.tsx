import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import WeeklyMenu from "./WeeklyMenu";
import { useAdminContext } from "../hooks/useAdminContext";

const MenuContainer = () => {
  const { menus } = useAdminContext();
  return <WeeklyMenu menus={menus} />;
};

export default MenuContainer;
