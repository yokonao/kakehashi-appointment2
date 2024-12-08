import { styled, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AdminHeader from "../features/admin/components/AdminHeader";
import { adminTheme } from "../features/admin/styles/adminTheme";
import { NotificationContextProvider } from "../features/form/hooks/useNotification";
import AdminDrawer from "../features/admin/components/AdminDrawer";
import Routes from "../features/admin/Routes";
import { AdminContextProvider } from "../features/admin/hooks/useAdminContext";
import LoadingIndicator from "../features/admin/components/LoadingIndicator";
import { ReactNode } from "react";

const Root = styled("div")(() => ({
  display: "flex",
}));

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(3),
  paddingTop: theme.spacing(8),
}));

const Admin = (): ReactNode => {
  return (
    <Root>
      <BrowserRouter>
        <ThemeProvider theme={adminTheme}>
          <NotificationContextProvider>
            <AdminContextProvider>
              <AdminHeader />
              <AdminDrawer />
              <Main>
                <Routes />
                <LoadingIndicator />
              </Main>
            </AdminContextProvider>
          </NotificationContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Root>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.body.appendChild(document.createElement("div"));
  const root = createRoot(container);
  root.render(<Admin />);
});
