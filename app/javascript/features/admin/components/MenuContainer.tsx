import React from "react";
import { makeStyles } from "@mui/material/styles";
import WeeklyMenu from "./WeeklyMenu";
import { useAdminContext } from "../hooks/useAdminContext";

const MenuContainer = () => {
  const { menus } = useAdminContext();
  return <WeeklyMenu menus={menus} />;
};

export default MenuContainer;
