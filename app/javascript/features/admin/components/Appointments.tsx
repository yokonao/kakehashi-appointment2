import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format } from "date-fns";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuSerializer } from "../../../serializers/MenuSerializer";

type Props = {
  appointments: AppointmentSerializer[];
  menus: MenuSerializer[];
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
              return <TableCell>{e}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => {
            const menu = menus.find((menu) => menu.id === appointment.menu_id);
            if (!menu) {
              return (
                <TableRow>
                  <TableCell>エラー：対応する予約枠が見つかりません</TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow>
                <TableCell>{appointment.full_name}</TableCell>
                <TableCell>
                  {format(appointment.birthday, "yyyy/M/d")}
                </TableCell>
                <TableCell>
                  {appointment.is_first_visit ? "初診" : "再診"}
                </TableCell>
                <TableCell>{format(menu.start_at, "yyyy/M/d H:mm")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Appointments;
