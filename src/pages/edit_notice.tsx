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
import EditDialog from '@/component/big/edite_notice_dialog'; 

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editNotice, setEditNotice] = useState<Notice | null>(null);
  
  useEffect(() => {
    //GET
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notice", {
          method: 'GET',
        });
  
        if (response.ok) {
          const data = await response.json();
  
          // Parse date strings into Date objects
          const noticesWithParsedDates = data.map((notice) => ({
            ...notice,
            start_date: new Date(notice.start_date),
            end_date: new Date(notice.end_date),
          }));
  
          setNotices(noticesWithParsedDates);
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
        // console.error('Error while deleting notice');
        // Handle the error or show a user-friendly message
        // console.log('delete ID : ', noticeId);
        // console.log(typeof noticeId);
      }
    } catch (error) {
      console.error('Error while deleting notice: ', error);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (notice: Notice) => {
    setEditNotice(notice);
    setEditDialogOpen(true);
 };

 const handleEditNotice = async (editedNotice: Notice) => {
  
  try {
    const response = await fetch(`/api/notice`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedNotice),
    });

    if (response.ok) {
      // Update the local state with the edited notice
      setNotices((prevNotices) =>
        prevNotices.map((n) =>
          n.id === editedNotice.id ? editedNotice : n
        )
      );

      // Close the edit dialog
      setEditDialogOpen(false);

      // Show success message using Snackbar
      setSnackbarOpen(true);

      window.location.reload();
    } else {
      console.error('Error while editing notice');
      // Log the response status and text for debugging
      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());
    }
  } catch (error) {
    console.error('Error while editing notice: ', error);
  }
};


  const formatDate = (date) => {
    if (!date) return ""; // handle the case where date is undefined or null
  
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("ja-JP", options);
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
              <p>{formatDate(notice.start_date)}から{formatDate(notice.end_date)}まで</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* Replace <p /> with actual newline characters (\n) */}
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {notice.content.replace(/<p \/>/g, '\n')}
              </pre>
              <Button 
                variant="outlined"
                onClick={() => handleDelete(notice.notice_id)}>
                DELETE
              </Button>
              <Button 
                variant="outlined"
                onClick={() => handleEdit(notice)}>
                EDIT
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

        {/* Edit Dialog */}
      <EditDialog
         open={editDialogOpen}
         notice={editNotice}
         onClose={() => setEditDialogOpen(false)}
         onEdit={(editedNotice) => handleEditNotice(editedNotice)}
      />

    </div>
  );
};

export default NoticesPage;