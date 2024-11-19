import React from "react";
import WeeklyMenu from "./WeeklyMenu";
import { useAdminContext } from "../hooks/useAdminContext";

const MenuContainer = () => {
  const { menus } = useAdminContext();
  return <WeeklyMenu menus={menus} />;
};

export default MenuContainer;
