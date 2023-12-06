import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, TextField, Snackbar } from '@mui/material';
import DatePicker from 'react-datepicker';
import MuiAlert from '@mui/material/Alert';

const NewNotice = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    setEndDateError(false); // 날짜가 변경되면 에러 상태 초기화
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
  };

  const handleSubmit = async () => {
    try {
      // 入力値が空であるか確認する
      if (title.trim() === '' || content.trim() === '') {
        setTitleError(title.trim() === '');
        setContentError(content.trim() === '');
        return;
      }

      // end_dateが現在の時間より過去であるか確認
      if (endDate < new Date()) {
        setEndDateError(true);
        return;
      }

      const response = await fetch('/api/notice', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        }),
      });

      if (response.ok) {
        setSuccessMessage('Notice successfully created!');
        setTimeout(() => {
          setSuccessMessage(null);
          // 공지 목록을 갱신하여 표시 (이 부분은 실제 상황에 맞게 API 호출로 변경해야 합니다)
          router.replace(router.asPath); // 예시로 현재 경로를 다시 로드하는 방식을 사용
        }, 3000); // Auto close success message after 3 seconds
        handleClose();
        window.location.reload();
      } else {
        console.error('Notice creation error');
      }
    } catch (error) {
      console.error('Notice creation error: ', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add notice
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle>お知らせ追加</DialogTitle>
          <DialogContent>
            <DialogContentText>
              お知らせを入力してください。
            </DialogContentText>

            <TextField
              required
              fullWidth
              label="Title"
              id="fullWidth"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false); // 텍스트가 변경되면 에러 상태 초기화
              }}
              margin="normal"
              error={titleError} // 에러 상태 적용
              helperText={titleError ? 'This field is required' : ''}
            />

            <TextField
              required
              fullWidth
              id="outlined-multiline-static"
              label="Content"
              type="text"
              multiline
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setContentError(false); // 텍스트가 변경되면 에러 상태 초기화
              }}
              margin="normal"
              error={contentError} // 에러 상태 적용
              helperText={contentError ? 'This field is required' : ''}

            />

            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy/MM/dd" // Set the desired date format
            />

            <p></p>

            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy/MM/dd" // Set the desired date format
              className={endDateError ? 'error' : ''}
            />
            {endDateError && (
              <p style={{ color: 'red' }}>End date cannot be in the past</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {/* Snackbar for success message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        message={successMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSuccessClose}>
          Notice deleted successfully!
        </MuiAlert>
      </Snackbar>

    </>
  );
};

export default NewNotice;
