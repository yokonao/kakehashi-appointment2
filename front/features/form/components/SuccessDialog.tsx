import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type OpenDialog = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessDialog = (props: OpenDialog) => {
  const { isOpen, onClose } = props;
  return (
    <Dialog open={isOpen}>
      <DialogTitle>予約が成立しました</DialogTitle>
      <DialogContent>
        <DialogContentText>
          この度は、かけはし糖尿病・甲状腺クリニックをご予約いただきましてありがとうございます。
          ご入力いただいたメールアドレスに確認メールを送付しています。
        </DialogContentText>
        <DialogContentText>
          メールが届かない場合、迷惑メールに振り分けられている可能性があります。
          恐れ入りますが迷惑メールフォルダや設定をご確認下さい。
          それでも当クリニックからのメールが確認できない場合は、お電話にてお問い合わせください。
        </DialogContentText>
        <DialogContentText>当日のご来院をお待ちしています。</DialogContentText>
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
