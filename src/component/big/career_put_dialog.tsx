import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, TextField, SelectChangeEvent, Autocomplete } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormDialogProps } from "@/types/props";
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmDialog } from "../mid/confirm_dialog";

export default function CareerPutFormDialog(props: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirm_dialog,setConfirm_dialog] = useState(false);
  const [formData, setFormData] = useState({
    notes:props.initialData.notes || '',         //備考
    career_path_id: props.initialData.career_path_id,
    selection_action_id: props.initialData.action_id,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(//キャリア活動日
    props.initialData.action_date ? new Date(props.initialData.action_date) : null
  );

  const handleClickOpen = () => {//ダイアログの開閉
    setOpen(true);
  };

  const handleConfirmDialogOpen = () => {
    setConfirm_dialog(true);
  }

  const handleConfirmDialogClose = () => {
    setConfirm_dialog(false);
  }

  const handleClose = () => {
    setOpen(false);
    setFormData({
      notes: props.initialData.notes || '',
      career_path_id: props.initialData.career_path_id,
      selection_action_id: props.initialData.action_id,
    });
    setSelectedDate(
      props.initialData.action_date ? new Date(props.initialData.action_date) : null
    );
  };

  const handleSubmit = async () => {//キャリア活動追加処理
    const response = await fetch('/api/career',{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({career_action_id:props.initialData.career_action_id,student_id:props.initialData.student_id,action_date:selectedDate,notes:formData.notes,career_path_id:formData.career_path_id,action_id:formData.selection_action_id})});
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: Number(value), // 文字列を数値に変換
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };
  
  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClickOpen} 
        startIcon={<EditIcon/>}>
        編集
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">キャリア活動入力</DialogTitle>
        <DialogContent sx={{mb:1}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="活動日"
        value={selectedDate}
        onChange={handleDateChange}
        sx={{mt:1}}
      />
    </LocalizationProvider>
          <FormControl fullWidth margin="normal">
          <Autocomplete
            disablePortal
            id="career_select"
            options={props.career_path_data}
            getOptionLabel={(option) => option.name}
            value={props.career_path_data.find(option => option.career_path_id === formData.career_path_id) || null} // 初期値の設定
            renderInput={(params) => <TextField {...params} label="会社名" />}
            onChange={(event, value) => setFormData({ ...formData, career_path_id: value?.career_path_id || 0 })}
         />
          </FormControl>
            <FormControl fullWidth margin="normal">
            <InputLabel id="action_select">就活アクション選択</InputLabel>
            <Select
              labelId="action_select"
              id="action_select"
              value={formData.selection_action_id?.toString()}
              onChange={handleSelectChange}
              inputProps={{ name: 'selection_action_id' }}
              label= "就活アクション選択"
            >
              {props.action_data.map((action) => (
                <MenuItem key={action.action_id} value={action.action_id}>{action.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="notes"
            label="備考"
            type="text"
            fullWidth
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            戻る
          </Button>
          <Button onClick={handleConfirmDialogOpen} color="primary">
            変更
          </Button>
          <ConfirmDialog
        open={confirm_dialog}
        onConfirm={handleSubmit}
        onCancel={handleConfirmDialogClose}
        title="確認"
        message="本当に編集しますか？"
      />
        </DialogActions>
      </Dialog>
    </div>
  );
}