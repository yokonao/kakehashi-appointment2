import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

const AdminHeader = () => {
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{ zIndex: 10, backgroundColor: "white" }}
    >
      <Toolbar>
        <Typography color="primary" variant="h6" sx={{ marginLeft: 15 }}>
          かけはし糖尿病・甲状腺クリニック 管理画面
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
