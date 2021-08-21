import { Box, Button } from "@material-ui/core";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import AppointmentDetailDialog from "./AppointmentDetailDialog";

type Props = {
  appointments: AppointmentSerializer[];
  menus: MenuAdminSerializer[];
};

const createColumns: (onDetail: (id: string) => void) => GridColDef[] = (
  onDetail
) => [
  { field: "full_name", headerName: "患者名", width: 200 },
  {
    field: "birthday",
    headerName: "生年月日",
    width: 150,
  },
  { field: "clinical_history", headerName: "診療歴", width: 150 },
  {
    field: "start_at",
    headerName: "予約日時",
    width: 200,
  },
  {
    field: "detail_button",
    headerName: "詳細",
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          onDetail(params.id.toString());
        }}
      >
        詳細
      </Button>
    ),
  },
  {
    field: "delete_button",
    headerName: "削除",
    sortable: false,
    width: 120,
    renderCell: (_) => (
      <Button variant="contained" color="secondary">
        削除
      </Button>
    ),
  },
];

export type AppointmentViewModel = {
  id: number;
  full_name: string;
  full_kana_name: string;
  birthday: string;
  clinical_history: string;
  clinical_number: string;
  email: string;
  phone_number: string;
  reason: string;
  free_comment: string;
  start_at: string;
};

const castToAppointmentViewModel = (
  serializer: AppointmentSerializer
): AppointmentViewModel => {
  return {
    ...serializer,
    birthday: format(serializer.birthday, "yyyy/M/d"),
    clinical_history: serializer.is_first_visit ? "初診" : "再診",
    start_at: format(serializer.start_at, "yyyy/M/d （E） H:mm", {
      locale: ja,
    }),
  };
};

const Appointments = (props: Props) => {
  const { appointments } = props;
  const rows = React.useMemo(
    () => appointments.map((e) => castToAppointmentViewModel(e)),
    [appointments]
  );
  const [selectedAppointmentId, setSelectedAppointmentId] =
    React.useState<number>(-1);
  return (
    <Box>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={createColumns((id) => {
            setSelectedAppointmentId(parseInt(id));
          })}
          pageSize={10}
          autoHeight
        />
      </div>
      <AppointmentDetailDialog
        id={selectedAppointmentId}
        onClose={() => {
          setSelectedAppointmentId(-1);
        }}
      />
    </Box>
  );
};

export default Appointments;
