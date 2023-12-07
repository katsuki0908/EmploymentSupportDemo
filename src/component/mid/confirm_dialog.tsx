import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { ConfirmDialogProps } from "@/types/props";

// カスタム確認ダイアログコンポーネント
export const ConfirmDialog = (props: ConfirmDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          いいえ
        </Button>
        <Button onClick={props.onConfirm} color="primary" autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};
