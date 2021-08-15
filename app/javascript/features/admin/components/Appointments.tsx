import { Box } from "@material-ui/core";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";

type Props = {
  data: AppointmentSerializer[];
};

const Appointments = (props: Props) => {
  const { data } = props;
  return <Box>{data.toString()}</Box>;
};

export default Appointments;
