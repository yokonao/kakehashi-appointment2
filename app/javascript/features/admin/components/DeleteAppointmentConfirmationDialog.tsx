import { Box, TextField, Typography } from "@mui/material";
import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
import { castToAppointmentViewModel } from "./AppointmentDetailDialog";

type Props = {
  appointment?: AppointmentSerializer;
  onOk: (reason: string) => void;
  onCancel: () => void;
};

const DeleteAppointmentConfirmationDialog = (props: Props) => {
  const { appointment } = props;
  const data = React.useMemo(
    () => castToAppointmentViewModel(appointment),
    [appointment]
  );
  const [reason, setReason] = React.useState("");
  React.useEffect(() => setReason(""), [data]);
  if (!data) {
    return <></>;
  }
  return (
    <ConfirmationDialog
      title="1件の予約を削除します"
      open={!!data}
      onOk={() => props.onOk(reason)}
      onCancel={props.onCancel}
      okButtonColor="secondary"
      okButtonText="削除"
      cancelButtonText="キャンセル"
      disableOkButton={reason.length < 5}
    >
      <Typography>予約日時：{data.start_at} </Typography>
      <Typography>氏名：{data.full_name}</Typography>
      <Typography>カナ：{data.full_kana_name} </Typography>
      <Typography>生年月日：{data.birthday} </Typography>
      <Typography>診療歴：{data.clinical_history} </Typography>
      <Typography>メールアドレス：{data.email} </Typography>
      <Typography>電話番号：{data.phone_number} </Typography>
      <Typography>受診理由：{data.reason} </Typography>
      <Typography>自由記入欄：{data.free_comment} </Typography>
      <Box mt={2}>
        <Typography>削除理由を5文字以上で入力して下さい</Typography>
        <TextField
          fullWidth
          onChange={(e) => {
            setReason(e.target.value);
          }}
        />
      </Box>
    </ConfirmationDialog>
  );
};

export default DeleteAppointmentConfirmationDialog;
