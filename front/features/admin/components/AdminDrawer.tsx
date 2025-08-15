import {
  Drawer,
  Toolbar,
  List,
  Typography,
  Icon,
  ListItemButton,
} from "@mui/material";
import client from "../../../shared/api/client";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const DrawerContainer = styled("div")(() => ({ overflow: "auto" }));

const AdminDrawer = () => {
  const location = useLocation();
  return (
    <Drawer variant="permanent" sx={{ width: 120, flexShrink: 0 }}>
      <Toolbar />
      <DrawerContainer>
        <List>
          <ListItemButton
            key="予約枠"
            component={Link}
            to="/admin/menus"
            selected={location.pathname === "/admin/menus"}
          >
            <Icon color="primary">today</Icon>
            <Typography color="primary">予約枠</Typography>
          </ListItemButton>
          <ListItemButton
            key="予約一覧"
            component={Link}
            to="/admin/appointments"
            selected={location.pathname === "/admin/appointments"}
          >
            <Icon color="primary">calendar_view_month</Icon>
            <Typography color="primary">予約一覧</Typography>
          </ListItemButton>

          <ListItemButton
            key={"ログアウト"}
            onClick={async () => {
              try {
                await client.delete("/administrators/sign_out");
              } catch (error) {
                // HACK: DELETE メソッドに対してリダイレクトが発生すると DELETE メソッドのままそのパスにアクセスしようとしてしまうため 404 エラーを無視している
                if (error.name === "AxiosError" && error.message === "Request failed with status code 404") {
                  // ignore
                } else {
                  throw error;
                }
              }
              window.location.href = "/administrators/sign_in";
            }}
          >
            <Icon color="primary">logout</Icon>
            <Typography color="primary">ログアウト</Typography>
          </ListItemButton>
        </List>
      </DrawerContainer>
    </Drawer>
  );
};

export default AdminDrawer;
