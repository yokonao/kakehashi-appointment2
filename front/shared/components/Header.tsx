import { AppBar, Toolbar, Typography } from "@mui/material";
import { Logo } from "./Logo";
import { useMediaType } from "../hooks/useMediaType";

const Header = () => {
  const mediaType = useMediaType();
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Logo isMobile={mediaType === "mobile"} />
        <Typography
          color="primary"
          variant={mediaType === "mobile" ? "subtitle2" : "h6"}
        >
          かけはし糖尿病・甲状腺クリニック
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
