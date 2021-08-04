import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          かけはし予約システム（仮）
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
