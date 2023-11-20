import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, TextField, SelectChangeEvent } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormDialogProps } from "@/types/session";
import { action_table, career_path_table } from "@prisma/client";
import EditIcon from '@mui/icons-material/Edit';

export default function CareerPutFormDialog(props: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [selection_action, setSelection_action] = useState<action_table[]>([]);
  const [selection_career_name, setSelection_career_name] = useState<career_path_table[]>([]);
  const [formData, setFormData] = useState({
    selection_action: props.initialData.selection_action || '',//キャリア活動アクション選択
    notes:props.initialData.notes || '',         //備考
    company_name:props.initialData.company_name || '',   //会社名選択
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(//キャリア活動日
    props.initialData.action_date ? new Date(props.initialData.action_date) : null
  );

  React.useEffect(() => {//会社名・アクション選択肢の取得
    const fetchData = async () => {
      try {
        const action = await fetch("/api/action_database?action_name" + selection_action, {
          method: 'GET',
        });
        if (action.ok) {
          const action_data = await action.json();
          setSelection_action(action_data);
        } else {
          console.error("Error while loading career data: HTTP status ", action.status);
        }


        const career_name = await fetch("/api/career_path_database?name" + selection_career_name, {
          method: 'GET',
        });
        if (action.ok) {
          const career_data = await career_name.json();
          setSelection_career_name(career_data);
        } else {
          console.error("Error while loading career data: HTTP status ", career_name.status);
        }

      } catch (error) {
        console.error("Error while loading career data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleClickOpen = () => {//ダイアログの開閉
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {//キャリア活動追加処理
    event.preventDefault();
    const response = await fetch('/api/career_database',{
    method: 'PUT',
    headers: {
         'Content-Type': 'application/json',
    },
    body: JSON.stringify({career_action_id:props.initialData.career_action_id,student_id:props.initialData.student_id,action_date:selectedDate,notes:formData.notes,action_name:formData.selection_action,name:formData.company_name})});
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen} endIcon={<EditIcon/>}>
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
            <InputLabel id="career_select">会社名選択</InputLabel>
            <Select
              labelId="career_select"
              id="career_select"
              value={formData.company_name}
              onChange={handleSelectChange}
              inputProps={{ name: 'company_name' }}
              label= "会社名選択"
            >
              {selection_career_name.map((career) => (
                <MenuItem key={career.career_path_id} value={career.name}>{career.name}</MenuItem>
              ))}
            </Select>
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
              {selection_action.map((action) => (
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
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
