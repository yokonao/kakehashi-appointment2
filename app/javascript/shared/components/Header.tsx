import * as React from "react";
import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "./Logo";

const Header = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Logo isMobile={isMobile} />
        <Typography color="primary" variant={isMobile ? "subtitle2" : "h6"}>
          かけはし糖尿病・甲状腺クリニック
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
