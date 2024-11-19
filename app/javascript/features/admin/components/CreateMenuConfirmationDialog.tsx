import { Typography } from "@mui/material";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

type Props = {
  date?: Date;
  onOk: (department: string) => void;
  onCancel: () => void;
};

const CreateMenuConfirmationDialog = (props: Props) => {
  const { date } = props;
  const [department, setDepartment] = React.useState<string>("内科");
  React.useEffect(
    () => setDepartment(date?.getDay() === 4 ? "漢方" : "内科"),
    [date]
  );
  if (!date) {
    return <></>;
  }
  return (
    <ConfirmationDialog
      title="1件の予約枠を作成します"
      open={!!date}
      onOk={() => props.onOk(department)}
      onCancel={props.onCancel}
      okButtonColor="primary"
      okButtonText="作成"
      cancelButtonText="キャンセル"
    >
      <Typography>{`診療科：${department}`}</Typography>
      <Typography>
        {`予約日時：${format(date, "yyyy/M/dd（E）HH:mm 〜", {
          locale: ja,
        })}`}
      </Typography>
    </ConfirmationDialog>
  );
};

export default CreateMenuConfirmationDialog;
