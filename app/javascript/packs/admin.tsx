import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AdminHeader from "../features/admin/components/AdminHeader";
import { adminTheme } from "../features/admin/styles/adminTheme";
import { useAdminStyles } from "../features/admin/styles/useAdminStyles";
import { NotificationContextProvider } from "../features/form/hooks/useNotification";
import AdminDrawer from "../features/admin/components/AdminDrawer";
import Routes from "../features/admin/Routes";
import { AdminContextProvider } from "../features/admin/hooks/useAdminContext";
import LoadingIndicator from "../features/admin/components/LoadingIndicator";

const Admin = (): JSX.Element => {
  const classes = useAdminStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ThemeProvider theme={adminTheme}>
          <NotificationContextProvider>
            <AdminContextProvider>
              <AdminHeader />
              <AdminDrawer />
              <main className={classes.content}>
                <Routes />
                <LoadingIndicator />
              </main>
            </AdminContextProvider>
          </NotificationContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Admin />,
    document.body.appendChild(document.createElement("div"))
  );
});
