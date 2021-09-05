import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
type Props = {
  title: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  okButtonColor: "primary" | "secondary";
  okButtonText: string;
  cancelButtonText: string;
  children?: React.ReactNode;
  disableOkButton?: boolean;
};

const ConfirmationDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="default">
          {props.cancelButtonText}
        </Button>
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
