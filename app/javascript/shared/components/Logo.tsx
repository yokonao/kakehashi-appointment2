import { Avatar } from "@material-ui/core";
import * as React from "react";

const logo_path = require("../../images/kakehashi-dm-logo.svg") as string;
const logo_name_path = require("../../images/kakehashi-dm-logo-name.svg") as string;

export const Logo = () => {
  return <img src={logo_path} height={100}/>;
};

export const LogoName = () => {
  return <img src={logo_name_path} height={60}/>
}
