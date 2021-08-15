import * as React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import Appointments from "./Appointments";

const AppointmentsContainer = () => {
  const { appointments } = useAdminContext();
  return <Appointments data={appointments} />;
};

export default AppointmentsContainer;
