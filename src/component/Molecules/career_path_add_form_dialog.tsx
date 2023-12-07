//会社名の追加
import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ConfirmDialog } from "../mid/confirm_dialog";

export default function CareerPathAddFormDialog() {
  const [open, setOpen] = useState(false);
  const [confirm_dialog,setconfirm_dialog] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    company_furigana: '',
    company_website: '',
  });

  const handleClickOpen = () => {//入力ダイアログの開閉
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDialogOpen = () => {//確認ダイアログの開閉
    setconfirm_dialog(true);
  }

  const handleConfirmDialogClose = () => {
    setconfirm_dialog(false);
  }

  const handleSubmit = async () => {//キャリア活動追加処理
    const response = await fetch('/api/career_path', {
      method: 'POST',
      body: JSON.stringify({ name: formData.company_name, furigana: formData.company_furigana, website: formData.company_website })
    });
    console.log(formData);
    console.log(response);

    if (response.ok) {
      // レスポンスが正常であればページをリロード
      window.location.reload();
    } else {
      // エラー処理
      console.error("フォームの送信に失敗しました。");
    }
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<AddCircleIcon />}
      >
        新規会社名追加
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">会社名追加</DialogTitle>
        <DialogContent sx={{ mb: 1 }}>
          <TextField
            margin="dense"
            id="company_name"
            label="会社名入力"
            type="text"
            fullWidth
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
          /> <TextField
            margin="dense"
            id="company_furigana"
            label="ふりがな"
            type="text"
            fullWidth
            name="company_furigana"
            value={formData.company_furigana}
            onChange={handleInputChange}
          /> <TextField
            margin="dense"
            id="company_website"
            label="ウェブサイト"
            type="text"
            fullWidth
            name="company_website"
            value={formData.company_website}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            戻る
          </Button>
          <Button onClick={handleSubmit} color="primary">
            追加
          </Button>
          <ConfirmDialog
          open={confirm_dialog}
          onConfirm={handleSubmit}
          onCancel={handleConfirmDialogClose}
          title="確認"
          message="本当に追加しますか？"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}