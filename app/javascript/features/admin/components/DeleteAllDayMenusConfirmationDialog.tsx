import { format } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

type Props = {
  date?: Date;
  onOk: () => void;
  onCancel: () => void;
};

const DeleteAllDayMenusConfirmationDialog = (props: Props) => {
  const { date } = props;
  if (!date) {
    return <></>;
  }
  return (
    <ConfirmationDialog
      title={format(date, "yyyy/M/dd（E）", {
        locale: ja,
      })}
      open={!!date}
      onOk={props.onOk}
      onCancel={props.onCancel}
      okButtonColor="secondary"
      okButtonText="削除"
      cancelButtonText="キャンセル"
    >
      {`${format(date, "yyyy/M/dd（E）", {
        locale: ja,
      })}の予約枠を全て削除します`}
    </ConfirmationDialog>
  );
};

export default DeleteAllDayMenusConfirmationDialog;
