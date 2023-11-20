import * as React from 'react';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '@/component/big/header';
import AddNewNotice from '@/component/big/add_new_notice';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

interface Notice {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  content: string;
}

const NoticesPage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {     //GET
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notice", {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        }
      } catch (error) {
        console.error("Error while loading data: ", error);
      }
    };

    fetchNotices();
  }, []);

  const handleDelete = async (noticeId: number) => {    //DELETE
    try {
      const response = await fetch(`/api/notice`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notice_id: noticeId }), // オブジェクトをJSON文字列に変換してbodyに含める
      });
  
      if (response.ok) {
        // Remove the deleted notice from the local state
        setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== noticeId));
        // Reset selectedNoticeId after successful deletion
        setSelectedNoticeId(null);
        // Show success message using Snackbar
        setSnackbarOpen(true);
        // Reload the page
        window.location.reload();
      } else {
        console.error('Error while deleting notice');
        // Handle the error or show a user-friendly message
        console.log('delete ID : ', noticeId);
        console.log(typeof noticeId);
      }
    } catch (error) {
      console.error('Error while deleting notice: ', error);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Header />

      <h1>お知らせ</h1>

      <AddNewNotice />

      {notices.map((notice) => (
        <Accordion 
          key={notice.notice_id} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${notice.id}-content`}
            id={`panel${notice.id}-header`}
          >
            <Typography>
              <h2><b>{notice.title}</b></h2>
              <p>{notice.start_date}から{notice.end_date}まで</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {notice.content}
              <Button 
                variant="outlined"
                onClick={() => handleDelete(notice.notice_id)}>
                DELETE
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleCloseSnackbar}>
        Notice deleted successfully!
      </MuiAlert>
      </Snackbar>

    </div>
  );
};

export default NoticesPage;