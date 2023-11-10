import * as React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import Link from "next/link";
import Header from "@/component/big/header";

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotices, setSelectedNotices] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notice_database", {
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

    const handleCheckboxChange = (id: number) => {
      const index = selectedNotices.indexOf(id);
      if (index === -1) {
        setSelectedNotices([...selectedNotices, id]);
      } else {
        setSelectedNotices(selectedNotices.filter((noticeId) => noticeId !== id));
      }
    };
  
    const handleDelete = async () => {
      try {
        const response = await fetch('/api/notice_database', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notice_id: selectedNotices,
          }),
        });
  
        if (response.ok) {
          router.push('/notices'); // Redirect to the notices page after deletion
        } else {
          console.error('Error while deleting notices');
          // Handle the error or show a user-friendly message
        }
      } catch (error) {
        console.error('Error while deleting notices: ', error);
      }
    };

  return (
    <div>
      <Header />

      <h1>お知らせ</h1>

      <Link href={`/new_notice`}>
        <button>add</button>
      </Link>
      
      {notices.map((notices) => (

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={notices.id}
            >
            
            <Checkbox
              checked={selectedNotices.includes(notices.id)}
              onChange={() => handleCheckboxChange(notices.id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />

              <Typography>
                <h2><b>{notices.title}</b></h2>
                <p>{notices.start_date}から{notices.end_date}まで</p>
              </Typography>

            </AccordionSummary>

            <AccordionDetails>
                <Typography>
                  {notices.content}
                </Typography>

              </AccordionDetails>
          </Accordion>


      ))}

      <button onClick={handleDelete}>Delete Selected Notices</button>

    </div>
  );
};

export default NoticesPage;
