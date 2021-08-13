import * as React from "react";

const logo_path = require("../../images/kakehashi-dm-logo.svg") as string;

export const Logo = (props: { isMobile: boolean }) => {
  return <img src={logo_path} height={props.isMobile ? 25 : 50} />;
};
