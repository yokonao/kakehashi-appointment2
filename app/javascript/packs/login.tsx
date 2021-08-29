import { Button, ThemeProvider, Typography, Box } from "@material-ui/core";
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
import LoadingIndicator from "../features/admin/components/LoadingIndicator";
import LoginContainer from "../features/admin/components/LoginContainer";

const history = createBrowserHistory();
const Login = (): JSX.Element => {
  const classes = useAdminStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <ThemeProvider theme={adminTheme}>
          <AdminHeader />
          <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
            <LoginContainer />
          </Box>
        </ThemeProvider>
      </Router>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement("div"))
  );
});
