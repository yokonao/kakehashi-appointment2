import {
  Button,
  ThemeProvider,
  Typography,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import AdminHeader from "../features/admin/components/AdminHeader";
import { adminTheme } from "../features/admin/styles/adminTheme";
import { useAdminStyles } from "../features/admin/styles/useAdminStyles";
import { NotificationContextProvider } from "../features/hooks/useNotification";
import client from "../shared/api/client";

const history = createBrowserHistory();
const Admin = (): JSX.Element => {
  const classes = useAdminStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <ThemeProvider theme={adminTheme}>
          <NotificationContextProvider>
            <AdminHeader />
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
                  {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
            <main className={classes.content}>
              <Typography variant="h1">ダッシュボード</Typography>
              <Button
                variant="contained"
                onClick={async () => {
                  await client.delete("/administrators/sign_out");
                  window.location.href = "/administrators/sign_in";
                }}
              >
                ログアウト
              </Button>
            </main>
            <div className={classes.footer} />
          </NotificationContextProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Admin />,
    document.body.appendChild(document.createElement("div"))
  );
});
