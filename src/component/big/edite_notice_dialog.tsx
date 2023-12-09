import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Notice } from "@/pages/edit_notice"; // Update the path based on your actual file structure
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ja from "date-fns/locale/ja";
import { addDays } from "date-fns"; // import addDays from date-fns library
import { Box } from "@mui/material";
import styled from "styled-components";
// import { notice_table } from "@prisma/client";

interface EditDialogProps {
  open: boolean;
  notice: Notice | null;
  onClose: () => void;
  onEdit: (editedNotice: Notice) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  notice,
  onClose,
  onEdit,
}) => {
  const [editedNotice, setEditedNotice] = React.useState<Notice | null>(notice);

  React.useEffect(() => {
    setEditedNotice(notice);
  }, [notice]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >,
  ) => {
    const { name, value } = e.target || {};

    setEditedNotice(prevNotice => {
      if (prevNotice === null) return null;
      return {
        ...prevNotice,
        [name as string]: value,
      };
    });
  };


  const handleEditClick = () => {
    if (editedNotice) {
      onEdit(editedNotice);
      onClose();
    }
  };

  const handleStartDateChange = (date: Date | null, _event: React.SyntheticEvent) => {
    setEditedNotice(prevNotice => {
      if (prevNotice === null) return null;
      // If date is null, return prevNotice without modifying it, or handle appropriately
      if (date === null) return prevNotice; 
      return { ...prevNotice, start_date: date };
    });
    console.log(_event);
  };

  

  const handleEndDateChange = (date: Date | null) => {
    setEditedNotice(prevNotice => {
      if (prevNotice === null) return null;
      // If date is null, return prevNotice without modifying it, or handle appropriately
      if (date === null) return prevNotice; 
      return { ...prevNotice, end_date: date };
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Notice</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={editedNotice?.title || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={!editedNotice?.title} // タイトルが空のときにエラー状態で表示
          helperText={!editedNotice?.title ? "Title is required" : ""} // タイトルが空のときにヘルプメッセージを表示
        />

        <TextField
          label="Content"
          name="content"
          value={editedNotice?.content || ""}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
          error={!editedNotice?.content} // 内容が空のときにエラー状態で表示
          helperText={!editedNotice?.content ? "Content is required" : ""} // 内容が空のときにヘルプメッセージを表示
        />

        <StyledDiv>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <DatePicker
              label="開始日"
              value={editedNotice?.start_date || null}
              onChange={handleStartDateChange}
              sx={{ mt: 1 }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <DatePicker
              label="終了日"
              value={editedNotice?.end_date || null}
              onChange={handleEndDateChange}
              sx={{ mt: 1 }}
              minDate={addDays(new Date(), 1)}
            />
          </LocalizationProvider>
        </StyledDiv>
        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>戻る</Button>
        <Button onClick={handleEditClick}>保存</Button>
      </DialogActions>
    </Dialog>
  );
};

const StyledDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margintop: 16px;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto; /* 가로 폭이 600px 이하일 때 스타일 변경 */
  }
`;

export default EditDialog;