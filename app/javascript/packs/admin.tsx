import { Button, ThemeProvider, Typography } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import AdminHeader from "../features/admin/components/AdminHeader";
import { adminTheme } from "../features/admin/styles/adminTheme";
import { useAdminStyles } from "../features/admin/styles/useAdminStyles";
import { NotificationContextProvider } from "../features/form/hooks/useNotification";
import client from "../shared/api/client";
import AdminDrawer from "../features/admin/components/AdminDrawer";
import Routes from "../features/admin/Routes";
import { AdminContextProvider } from "../features/admin/hooks/useAdminContext";

const history = createBrowserHistory();
const Admin = (): JSX.Element => {
  const classes = useAdminStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <ThemeProvider theme={adminTheme}>
          <NotificationContextProvider>
            <AdminContextProvider>
              <AdminHeader />
              <AdminDrawer />
              <main className={classes.content}>
                <Routes />
              </main>
            </AdminContextProvider>
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
