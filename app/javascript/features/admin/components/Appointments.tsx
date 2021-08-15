import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { MenuSerializer } from "../../../serializers/MenuSerializer";

type Props = {
  appointments: AppointmentSerializer[];
  menus: MenuAdminSerializer[];
};

const headers = ["患者名", "生年月日", "診療歴", "予約日時"];

const Appointments = (props: Props) => {
  const { appointments, menus } = props;
  return (
    <Box m={2}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((e) => {
              return (
                <TableCell key={"appointment-table-header-" + e}>{e}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => {
            return (
              <TableRow
                key={"appointment-table-row-" + appointment.id.toString()}
              >
                <TableCell>{appointment.full_name}</TableCell>
                <TableCell>
                  {format(appointment.birthday, "yyyy/M/d")}
                </TableCell>
                <TableCell>
                  {appointment.is_first_visit ? "初診" : "再診"}
                </TableCell>
                <TableCell>
                  {format(appointment.start_at, "yyyy/M/d （E） H:mm", {
                    locale: ja,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Appointments;
