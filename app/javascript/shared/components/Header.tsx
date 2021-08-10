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
        {/* <Box m={2}>
          <Link to="/form/internal_medicine">内科</Link>
        </Box>
        <Box m={2}>
          <Link to="/form/kampo">漢方</Link>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
