import { Backdrop, CircularProgress, styled } from "@mui/material";
import * as React from "react";
import { useAdminContext } from "../hooks/useAdminContext";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
}));

const LoadingIndicator = () => {
  const { isLoading } = useAdminContext();
  return (
    <StyledBackdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

export default LoadingIndicator;
