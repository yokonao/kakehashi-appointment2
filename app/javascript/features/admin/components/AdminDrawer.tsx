import { useAdminStyles } from "../styles/useAdminStyles";
import React from "react";
import {
  Drawer,
  Toolbar,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import client from "../../../shared/api/client";

const AdminDrawer = () => {
  const classes = useAdminStyles();
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
          {["予約枠", "予約一覧"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem
            button
            key={"ログアウト"}
            onClick={async () => {
              await client.delete("/administrators/sign_out");
              window.location.href = "/administrators/sign_in";
            }}
          >
            <ListItemText primary={"ログアウト"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default AdminDrawer;
