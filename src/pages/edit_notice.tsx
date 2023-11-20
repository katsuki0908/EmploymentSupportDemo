import * as React from 'react';
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from "@/component/big/header";
import AddNewNotice from "@/component/big/add_new_notice"
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
  const [openNotices, setOpenNotices] = React.useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
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

  const handleDelete = async (noticeId: number) => {
    try {
      const response = await fetch(`/api/notice`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notice_id: noticeId }), // 객체를 JSON 문자열로 변환하여 body에 포함
      });
  
      if (response.ok) {
        // Remove the deleted notice from the local state
        setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== noticeId));
        // Reset selectedNoticeId after successful deletion
        setSelectedNoticeId(null);
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
              <p>Notice ID: {notice.notice_id}</p> {/* Display the notice ID */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {notice.content}
              <Button 
                onClick={() => handleDelete(notice.notice_id)}>
                DELETE
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default NoticesPage;