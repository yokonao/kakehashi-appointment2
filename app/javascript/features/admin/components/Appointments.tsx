import { Box, Button } from "@material-ui/core";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import AppointmentDetailDialog from "./AppointmentDetailDialog";
import DeleteAppointmentConfirmationDialog from "./DeleteAppointmentConfirmationDialog";
import { useNotification } from "../../form/hooks/useNotification";
import { useAdminContext } from "../hooks/useAdminContext";
import { AdminApiClient } from "../api/AdminApiClient";

type Props = {
  appointments: AppointmentSerializer[];
  menus: MenuAdminSerializer[];
};

const createColumns: (
  onDetail: (id: number) => void,
  onDelete: (id: number) => void
) => GridColDef[] = (onDetail, onDelete) => [
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
          const id = parseInt(params.id.toString());
          onDetail(id);
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
    renderCell: (params) => (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          const id = parseInt(params.id.toString());
          onDelete(id);
        }}
      >
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
  const { addInfo } = useNotification();
  const { fetchData } = useAdminContext();
  const { appointments } = props;
  const rows = React.useMemo(
    () => appointments.map((e) => castToAppointmentViewModel(e)),
    [appointments]
  );
  const [selectedAppointmentId, setSelectedAppointmentId] =
    React.useState<number>(-1);
  const [selectedAppointmentToDelete, setSelectedAppointmentToDelete] =
    React.useState<AppointmentSerializer | undefined>(undefined);
  return (
    <Box>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={createColumns(
            (id) => {
              setSelectedAppointmentId(id);
            },
            (id) =>
              setSelectedAppointmentToDelete(
                appointments.find((e) => e.id === id)
              )
          )}
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
      <DeleteAppointmentConfirmationDialog
        appointment={selectedAppointmentToDelete}
        onOk={() => {
          if (!selectedAppointmentToDelete) {
            return;
          }
          AdminApiClient.deleteAppointment(selectedAppointmentToDelete.id).then(
            (res) => {
              addInfo(res.message);
              fetchData();
            }
          );
          setSelectedAppointmentToDelete(undefined);
        }}
        onCancel={() => {
          setSelectedAppointmentToDelete(undefined);
        }}
      />
    </Box>
  );
};

export default Appointments;
