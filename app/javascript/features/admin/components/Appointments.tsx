import { Box, Button } from "@mui/material";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AppointmentDetailDialog, {
  castToAppointmentViewModelForce,
} from "./AppointmentDetailDialog";
import DeleteAppointmentConfirmationDialog from "./DeleteAppointmentConfirmationDialog";
import { useNotification } from "../../form/hooks/useNotification";
import { useAdminContext } from "../hooks/useAdminContext";
import { AdminApiClient } from "../api/AdminApiClient";
import { useMemo, useState } from "react";

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

const Appointments = (props: Props) => {
  const { addInfo } = useNotification();
  const { fetchData } = useAdminContext();
  const { appointments } = props;
  const rows = useMemo(
    () => appointments.map((e) => castToAppointmentViewModelForce(e)),
    [appointments]
  );
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<number>(-1);
  const [selectedAppointmentToDelete, setSelectedAppointmentToDelete] =
    useState<AppointmentSerializer | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(0);

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
          paginationModel={{
            page: currentPage,
            pageSize: 10,
          }}
          onPaginationModelChange={({ page }) => {
            setCurrentPage(page);
          }}
          autoHeight
          sx={{ margin: 2 }}
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
        onOk={(reason: string) => {
          if (!selectedAppointmentToDelete) {
            return;
          }
          AdminApiClient.deleteAppointment(
            selectedAppointmentToDelete.id,
            reason
          ).then((res) => {
            addInfo(res.message);
            fetchData();
          });
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
