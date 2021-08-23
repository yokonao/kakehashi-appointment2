import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import React from "react";

type OpenDialog = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessDialog = (props: OpenDialog) => {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  return (
    <Dialog open={isOpen}>
      <DialogTitle>予約が成立しました</DialogTitle>
      <DialogContent>
        <DialogContentText>
          この度は、かけはし糖尿病・甲状腺クリニックをご予約いただきましてありがとうございます。
          ご入力いただいたメールアドレスに確認メールを送付しています。
        </DialogContentText>
        <DialogContentText>
          メールが届かない場合はお手数ですが電話にてお問い合わせください。
          当日のご来院をお待ちしています。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            window.open("/form/internal_medicine", "_self");
          }}
          color="primary"
        >
          確認しました
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
