import {
  AppBar,
  createStyles,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

const StyledAppBar = styled(AppBar)(() =>
  createStyles({
    body: {
      fontSize: 14,
    },
  })
);

const AdminHeader = () => {
  return (
    <StyledAppBar
      position="fixed"
      color="default"
      sx={{ zIndex: 10, backgroundColor: "white" }}
    >
      <Toolbar>
        <Typography color="primary" variant="h6" sx={{ marginLeft: 15 }}>
          かけはし糖尿病・甲状腺クリニック 管理画面
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AdminHeader;
