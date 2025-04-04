import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { ReactNode } from "react";
type Props = {
  title: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  okButtonColor: "primary" | "secondary";
  okButtonText: string;
  cancelButtonText: string;
  children?: ReactNode;
  disableOkButton?: boolean;
};

const ConfirmationDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>{props.cancelButtonText}</Button>
        <Button
          onClick={props.onOk}
          color={props.okButtonColor}
          disabled={props.disableOkButton}
        >
          {props.okButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
