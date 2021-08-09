import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { Logo, LogoName } from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Logo />
        <LogoName />
        <Box m={2}>
          <Link to="/form/internal_medicine">内科</Link>
        </Box>
        <Box m={2}>
          <Link to="/form/kampo">漢方</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
