import { ThemeProvider, Box } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AdminHeader from "../features/admin/components/AdminHeader";
import { adminTheme } from "../features/admin/styles/adminTheme";
import { useAdminStyles } from "../features/admin/styles/useAdminStyles";
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
