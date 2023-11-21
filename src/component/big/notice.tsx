//お知らせ(表示機能、検索機能のみ)（編集機能はない）
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { notice_table } from "@prisma/client";
import { formatDate } from '@/utils/date_utils';//自作関数

const NoticesPage = () => {
  const [notices, setNotices] = useState<notice_table[]>([]);

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
              {formatDate(notices.start_date)}から{formatDate(notices.end_date)}まで
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
