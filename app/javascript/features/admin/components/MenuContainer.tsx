import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { format, startOfWeek, addDays } from "date-fns";
import { ja } from "date-fns/locale";
import WeeklyMenu from "./WeeklyMenu";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { useAdminContext } from "../hooks/useAdminContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    border: "thick double #99720f",
    height: 500,
    width: 120,
  },
  control: {
    padding: theme.spacing(1),
  },
}));

const MenuContainer = () => {
  const { menus } = useAdminContext();
  return <WeeklyMenu menus={menus} />;
};

export default MenuContainer;
