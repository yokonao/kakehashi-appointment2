import { createTheme, styled, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "../features/form/Routes";
import { MenusContextProvider } from "../features/form/hooks/useMenusContext";
import { NotificationContextProvider } from "../features/form/hooks/useNotification";
import Header from "../shared/components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#99720f",
    },
  },
});

const Root = styled("div")(() => ({
  flexGrow: 1,
  backgroundColor: "#fff8e6",
}));

const Footer = styled("div")(() => ({
  height: 300,
}));

const App = (): JSX.Element => {
  return (
    <Root>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NotificationContextProvider>
            <MenusContextProvider>
              <Header />
              <Routes />
              <Footer />
            </MenusContextProvider>
          </NotificationContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Root>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.body.appendChild(document.createElement("div"));
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
});
