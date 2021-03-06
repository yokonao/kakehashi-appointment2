import { useAdminStyles } from "../styles/useAdminStyles";
import React from "react";
import {
  Drawer,
  Toolbar,
  ListItem,
  ListItemText,
  List,
  Typography,
  Icon,
} from "@material-ui/core";
import client from "../../../shared/api/client";
import { Link, useLocation } from "react-router-dom";

const AdminDrawer = () => {
  const classes = useAdminStyles();
  const location = useLocation();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem
            button
            key="予約枠"
            component={Link}
            to="/admin/menus"
            selected={location.pathname === "/admin/menus"}
          >
            <Icon color="primary">today</Icon>
            <Typography color="primary">予約枠</Typography>
          </ListItem>
          <ListItem
            button
            key="予約一覧"
            component={Link}
            to="/admin/appointments"
            selected={location.pathname === "/admin/appointments"}
          >
            <Icon color="primary">calendar_view_month</Icon>
            <Typography color="primary">予約一覧</Typography>
          </ListItem>

          <ListItem
            button
            key={"ログアウト"}
            onClick={async () => {
              await client.delete("/administrators/sign_out");
              window.location.href = "/administrators/sign_in";
            }}
          >
            <Icon color="primary">logout</Icon>
            <Typography color="primary">ログアウト</Typography>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default AdminDrawer;
