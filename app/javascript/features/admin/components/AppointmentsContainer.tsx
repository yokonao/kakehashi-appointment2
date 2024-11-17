import * as React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import Appointments from "./Appointments";

const AppointmentsContainer = () => {
  const { appointments, menus } = useAdminContext();
  return <Appointments appointments={appointments} menus={menus} />;
};

export default AppointmentsContainer;
