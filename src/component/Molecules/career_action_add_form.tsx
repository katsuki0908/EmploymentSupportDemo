//キャリアアクションの追加
import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function CareerActionAddFormDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    action_name: '',
  });

  const handleClickOpen = () => {//ダイアログの開閉
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {//キャリア活動追加処理
    event.preventDefault();
    const response = await fetch('/api/career_action', {
      method: 'POST',
      body: JSON.stringify({ name: formData.action_name })
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
        新規キャリアアクション追加
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">キャリアアクション追加</DialogTitle>
        <DialogContent sx={{ mb: 1 }}>
          <TextField
            margin="dense"
            id="company_name"
            label="キャリアアクション入力"
            type="text"
            fullWidth
            name="company_name"
            value={formData.action_name}
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
        </DialogActions>
      </Dialog>
    </div>
  );
}