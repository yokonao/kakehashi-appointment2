import { useAdminStyles } from "../styles/useAdminStyles";
import React from "react";
import {
  Drawer,
  Toolbar,
  ListItem,
  ListItemText,
  List,
  Typography,
  Icon
} from "@material-ui/core";
import client from "../../../shared/api/client";
import { Link } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";

const AdminDrawer = () => {
  const classes = useAdminStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button key="予約枠" component={Link} to="/admin/menus">
            <span className="materialIconsOutlined">
              <Icon>today</Icon>
            </span>
            <Typography color="primary">予約枠</Typography>
          </ListItem>
          <ListItem
            button
            key="予約一覧"
            component={Link}
            to="/admin/appointments"
          >
            <span className="materialIconsOutlined">
              <Icon>calendar_view_month</Icon>
            </span>
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
            <span className="materialIconsOutlined">
              <Icon>logout</Icon>
            </span>
            <Typography color="primary">ログアウト</Typography>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default AdminDrawer;
