import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Notice } from '@/pages/edit_notice'; // Update the path based on your actual file structure
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns'; // import addDays from date-fns library

interface EditDialogProps {
  open: boolean;
  notice: Notice | null;
  onClose: () => void;
  onEdit: (editedNotice: Notice) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, notice, onClose, onEdit }) => {
  const [editedNotice, setEditedNotice] = React.useState<Notice | null>(notice);

  React.useEffect(() => {
    setEditedNotice(notice);
  }, [notice]);

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

  const handleStartDateChange = (date: Date | null) => {
    setEditedNotice((prevNotice) => ({
      ...prevNotice,
      start_date: date,
    }));
  };
  
  const handleEndDateChange = (date: Date | null) => {
    setEditedNotice((prevNotice) => ({
      ...prevNotice,
      end_date: date,
    }));
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Notice</DialogTitle>
      <DialogContent>
      <TextField
        label="Title"
        name="title"
        value={editedNotice?.title || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required // 필수 입력 필드로 지정
        error={!editedNotice?.title} // title이 비어있을 때 에러 상태로 표시
        helperText={!editedNotice?.title ? "Title is required" : ""} // title이 비어있을 때 도움말 메시지 표시
      />

      <TextField
        label="Content"
        name="content"
        value={editedNotice?.content || ''}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        required // 필수 입력 필드로 지정
        error={!editedNotice?.content} // content가 비어있을 때 에러 상태로 표시
        helperText={!editedNotice?.content ? "Content is required" : ""} // content가 비어있을 때 도움말 메시지 표시
      />
        <label>Start Date:</label>
        <DatePicker
          selected={editedNotice?.start_date || null}
          onChange={handleStartDateChange}
          dateFormat="yyyy/MM/dd" // Set the desired date format
        />

        <p></p>

          <label>End Date:</label>
          <DatePicker
          selected={editedNotice?.end_date || null}
          onChange={handleEndDateChange}
          dateFormat="yyyy/MM/dd"
          minDate={addDays(new Date(), 1)} // Set the minimum date to the current date + 1 day
        />

        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEditClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;