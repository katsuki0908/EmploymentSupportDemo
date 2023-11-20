import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Notice } from '@/pages/edit_notice'; // Update the path based on your actual file structure
import DatePicker from 'react-datepicker';

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