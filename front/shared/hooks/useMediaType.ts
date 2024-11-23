import { useMediaQuery } from "@mui/material";

export type MediaType = "mobile" | "tablet" | "desktop";

export const useMediaType = (): MediaType => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDesktop = useMediaQuery("(min-width:1024px)");

  if (isMobile) {
    return "mobile";
  } else if (isDesktop) {
    return "desktop";
  } else {
    return "tablet";
  }
};
