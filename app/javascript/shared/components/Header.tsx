import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Logo, LogoName } from "./Logo";

const Header = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Logo />
        <LogoName/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
