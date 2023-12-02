import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import DatePicker from 'react-datepicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays } from 'date-fns';
import { Joblist } from '@/component/big/joblist';
import { Autocomplete, FormControl } from '@mui/material';
import { career_path_table } from "@prisma/client";


interface EditDialogProps {
  open: boolean;
  joblist: Joblist | null;
  onClose: () => void;
  onEdit: (editedJoblist: Joblist) => void;
}

const EditJoblistDialog: React.FC<EditDialogProps> = ({ open, joblist, onClose, onEdit }) => {
  const [editedJoblist, setEditedJoblist] = React.useState<Joblist | null>(joblist);
  const [selection_career_name, setSelection_career_name] = React.useState<career_path_table[]>([]);

  // 入力フォーム初期値の設定？
  React.useEffect(() => {
    setEditedJoblist(joblist);
  }, [joblist]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target || {};

    setEditedNotice((prevNotice) => ({
      ...prevNotice,
      [name as string]: value,
    }));
  };

  const handleEditClick = () => {
    if (editedNotice) {
      onEdit(editedNotice);
      onClose();
    }
  };

  // const handleStartDateChange = (date: Date | null) => {
  //   setEditedNotice((prevNotice) => ({
  //     ...prevNotice,
  //     start_date: date,
  //   }));
  // };
  
  // const handleEndDateChange = (date: Date | null) => {
  //   setEditedNotice((prevNotice) => ({
  //     ...prevNotice,
  //     end_date: date,
  //   }));
  // };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>求人票を編集</DialogTitle>
      <DialogContent>
      {/* 会社名 */}
      <FormControl fullWidth margin="normal">
          <Autocomplete
              disablePortal
              id="career_select"
              value={editedJoblist?.career_path["name"] || ''}
              options={selection_career_name}
              getOptionLabel={(option) => option.name} 
              renderInput={(params) => <TextField {...params} label="会社名" />}
              onChange={(event, value) => setEditedJoblist({ ...formData, career_path_id: value?.career_path_id || '' })}
          />
      </FormControl>
      <TextField
        label="会社名"
        name="career_path_id"
        value={editedJoblist?.career_path["name"] || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={!editedJoblist?.career_path["name"]} 
        helperText={!editedJoblist?.career_path["name"] ? "会社名が必要です" : ""}
      />
      {/* 備考 */}
      <TextField
        label="備考"
        name="備考"
        value={editedJoblist?.notes || ''}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={2}
        margin="normal"
        required
        error={!editedJoblist?.notes}
        helperText={!editedJoblist?.notes ? "notes is required" : ""}
      />
      {/* 応募形式 */}
      {/* 送付日 */}
      {/* 来学日 */}
      {/* 掲載開始日 */}
      {/* 掲載終了日 */}
        {/* <label>Start Date:</label>
        <DatePicker
          selected={editedJoblist?.start_date || null}
          onChange={handleStartDateChange}
          dateFormat="yyyy/MM/dd" // Set the desired date format
        />

        <p></p>

          <label>End Date:</label>
          <DatePicker
          selected={editedJoblist?.end_date || null}
          onChange={handleEndDateChange}
          dateFormat="yyyy/MM/dd"
          minDate={addDays(new Date(), 1)} // Set the minimum date to the current date + 1 day
        /> */}

        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEditClick}>Save</Button>
      </DialogActions>
    </Dialog>

  );
};

export default EditJoblistDialog;