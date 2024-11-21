import { Backdrop, CircularProgress, styled } from "@mui/material";

type PropsLoading = {
  isLoading: boolean;
};

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
}));

const LoadingIndicator = (props: PropsLoading) => {
  const isLoading = props.isLoading;
  return (
    <StyledBackdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

export default LoadingIndicator;
