import { format } from "date-fns";
import * as React from "react";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

type Props = {
  menu?: MenuAdminSerializer;
  onOk: () => void;
  onCancel: () => void;
};

const DeleteMenuConfirmationDialog = (props: Props) => {
  const { menu } = props;
  if (!menu) {
    return <></>;
  }
  return (
    <ConfirmationDialog
      title="1件の予約枠を削除します"
      open={!!menu}
      onOk={props.onOk}
      onCancel={props.onCancel}
      okButtonColor="secondary"
      okButtonText="削除"
      cancelButtonText="キャンセル"
    >
      {`予約日時：${format(menu.start_at, "M/dd HH:mm")} 〜
                            ${format(menu.end_at, "M/dd HH:mm")}`}
    </ConfirmationDialog>
  );
};

export default DeleteMenuConfirmationDialog;
