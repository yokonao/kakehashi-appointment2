import { Button, ThemeProvider, Typography, Box } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AdminHeader from "../features/admin/components/AdminHeader";
import { adminTheme } from "../features/admin/styles/adminTheme";
import { useAdminStyles } from "../features/admin/styles/useAdminStyles";
import { NotificationContextProvider } from "../features/form/hooks/useNotification";
import client from "../shared/api/client";
import AdminDrawer from "../features/admin/components/AdminDrawer";
import Routes from "../features/admin/Routes";
import { AdminContextProvider } from "../features/admin/hooks/useAdminContext";
import LoadingIndicator from "../features/admin/components/LoadingIndicator";
import LoginContainer from "../features/admin/components/LoginContainer";

const Login = (): JSX.Element => {
  const classes = useAdminStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ThemeProvider theme={adminTheme}>
          <AdminHeader />
          <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
            <LoginContainer />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement("div"))
  );
});
