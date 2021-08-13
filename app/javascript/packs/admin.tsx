import {
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  AppBar
} from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { useAdminStyles } from "../features/admin/styles/useAdminStyles";
import { NotificationContextProvider } from "../features/hooks/useNotification";
import client from "../shared/api/client";
import Header from "../shared/components/Header";
import { Logo } from "../shared/components/Logo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#99720f"
    }
  }
});

const history = createBrowserHistory();
const Admin = (): JSX.Element => {
  const classes = useAdminStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <NotificationContextProvider>
            <AppBar position="fixed" color="default" className={classes.appBar}>
              <Toolbar>
                <Logo isMobile={false} />
                <Typography color="primary" variant="h6">
                  かけはし糖尿病・甲状腺クリニック
                </Typography>
              </Toolbar>
            </AppBar>
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
