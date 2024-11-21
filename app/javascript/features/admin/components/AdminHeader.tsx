import {
  AppBar,
  createStyles,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logo } from "../../../shared/components/Logo";

const StyledAppBar = styled(AppBar)(({ theme }) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
);

const AdminHeader = () => {
  return (
    <StyledAppBar position="fixed" color="default" sx={{ zIndex: 10 }}>
      <Toolbar>
        <Logo isMobile={false} />
        <Typography color="primary" variant="h6">
          かけはし糖尿病・甲状腺クリニック
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AdminHeader;
