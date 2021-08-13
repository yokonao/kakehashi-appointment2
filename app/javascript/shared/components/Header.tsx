import * as React from "react";
import { AppBar, Box, Theme, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Logo, LogoName } from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Logo isMobile={isMobile}/>
        <Typography color="primary" variant="h6">
          かけはし糖尿病・甲状腺クリニック
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
