import { AppBar, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { Logo } from "../../../shared/components/Logo";
import { useAdminStyles } from "../styles/useAdminStyles";

const AdminHeader = () => {
  const classes = useAdminStyles();
  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <Logo isMobile={false} />
        <Typography color="primary" variant="h6">
          かけはし糖尿病・甲状腺クリニック
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
