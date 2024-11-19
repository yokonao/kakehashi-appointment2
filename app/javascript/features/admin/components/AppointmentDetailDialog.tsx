import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { useAdminContext } from "../hooks/useAdminContext";

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

export const castToAppointmentViewModel = (
  serializer?: AppointmentSerializer
): AppointmentViewModel | undefined => {
  if (!serializer) return undefined;
  return {
    ...serializer,
    birthday: format(serializer.birthday, "yyyy/MM/dd"),
    clinical_history: serializer.is_first_visit ? "初診" : "再診",
    start_at: format(serializer.start_at, "yyyy/MM/dd （E） HH:mm", {
      locale: ja,
    }),
  };
};

export const castToAppointmentViewModelForce = (
  serializer: AppointmentSerializer
): AppointmentViewModel => {
  return {
    ...serializer,
    birthday: format(serializer.birthday, "yyyy/MM/dd"),
    clinical_history: serializer.is_first_visit ? "初診" : "再診",
    start_at: format(serializer.start_at, "yyyy/MM/dd （E） HH:mm", {
      locale: ja,
    }),
  };
};

const AppointmentDetailDialog = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  const { appointments } = useAdminContext();
  const appointment = React.useMemo(
    () => castToAppointmentViewModel(appointments.find((e) => e.id === id)),
    [id, appointments]
  );
  return (
    <Dialog open={!!appointment} onClose={onClose}>
      <DialogTitle>予約</DialogTitle>
      <DialogContent>
        <Typography>予約日時：{appointment?.start_at} </Typography>
        <Typography>氏名漢字：{appointment?.full_name}</Typography>
        <Typography>氏名カナ：{appointment?.full_kana_name} </Typography>
        <Typography>生年月日：{appointment?.birthday} </Typography>
        <Typography>診療履歴：{appointment?.clinical_history} </Typography>
        <Typography>アドレス：{appointment?.email} </Typography>
        <Typography>電話番号：{appointment?.phone_number} </Typography>
        <Typography>受診理由：{appointment?.reason} </Typography>
        <Typography>自由記入：{appointment?.free_comment} </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
          color="primary"
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDetailDialog;
