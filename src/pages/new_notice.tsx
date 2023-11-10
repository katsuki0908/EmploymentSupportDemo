// pages/new-notice.tsx

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const NewNotice = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notification, setNotification] = useState<string | null>(null);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/notice_database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        }),
      });

      if (response.ok) {
        setNotification('공지 등록에 성공했습니다!');
        setTimeout(() => {
          setNotification(null);
          router.push('/top'); // Redirect to the notices page after submission
        }, 2000); // 2 seconds delay before redirecting
      } else {
        console.error('Error while creating notice');
      }
    } catch (error) {
      console.error('Error while creating notice: ', error);
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  
  return (
    <div>
      <h1>Add New Notice</h1>
      {notification && 
      <Snackbar>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      } 


      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <p></p>

      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <p></p>

      <label>Start Date:</label>
      <DatePicker selected={startDate} onChange={handleStartDateChange} />

      <p></p>

      <label>End Date:</label>
      <DatePicker selected={endDate} onChange={handleStartDateChange} />

      <p></p>

      <button onClick={handleSubmit}>Submit</button>

    </div>
  );
};

export default NewNotice;
