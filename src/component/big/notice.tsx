//お知らせ(表示機能、検索機能のみ)（編集機能はない）

import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const NoticesPage = () => {
  const [notices, setNotices] = useState([]);

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

  return (
    <div>
      <h1>お知らせ</h1>
      
      {notices.map((notices) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
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

    </div>
  );
};

export default NoticesPage;
