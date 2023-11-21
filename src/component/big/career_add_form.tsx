import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, TextField, SelectChangeEvent, Container } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormDialogProps } from "@/types/props";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Autocomplete } from "@mui/material";

export default function CareerAddFormDialog(props: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selection_action, setSelection_action] = useState<action_table[]>([]);
  // const [selection_career_name, setSelection_career_name] = useState<career_path_table[]>([]);
  const [formData, setFormData] = useState({
    selection_action: '',//キャリア活動アクション選択
    notes: '',           //備考
    company_name: '',    //会社名選択
  });

  const handleClickOpen = () => {//ダイアログの開閉
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {//キャリア活動追加処理
    event.preventDefault();
    const response = await fetch('/api/career_database',{
    method: 'POST',
    headers: {
         'Content-Type': 'application/json',
    },
    body: JSON.stringify({student_id:props.initialData.student_id,action_date:selectedDate,notes:formData.notes,action_name:formData.selection_action,name:formData.company_name})});
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
      [name]: value,
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
      <Container>
      <Button 
      variant="contained" 
      color="primary" 
      onClick={handleClickOpen} 
      endIcon={<AddCircleIcon/>}
      sx={{margin:1}}
      >
        追加
      </Button>
      </Container>
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
            getOptionLabel={(option) => option.name} // ここでオブジェクトからラベル文字列を取得
            renderInput={(params) => <TextField {...params} label="会社名" />}
            onChange={(event, value) => setFormData({ ...formData, company_name: value?.name || '' })} // 選択されたオブジェクトの 'name' プロパティを使用
          />
            </FormControl>
            <FormControl fullWidth margin="normal">
            <InputLabel id="action_select">就活アクション選択</InputLabel>
            <Select
              labelId="action_select"
              id="action_select"
              value={formData.selection_action}
              onChange={handleSelectChange}
              inputProps={{ name: 'selection_action' }}
              label= "就活アクション選択"
            >
              {props.action_data?.map((action) => (
                <MenuItem key={action.action_id} value={action.action_name}>{action.action_name}</MenuItem>
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
          <Button onClick={handleSubmit} color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
