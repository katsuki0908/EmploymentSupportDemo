//お知らせ(表示機能、検索機能のみ)（編集機能はない）
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box,CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { notice_table } from "@prisma/client";
import { formatDate } from "@/utils/date_utils"; //自作関数
import styled from "styled-components";

const NoticesPage = () => {
  const [notices, setNotices] = useState<notice_table[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notice", {
          method: "GET",
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

  if (notices.length === 0) {
    return(
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
          }}
        >
          <CircularProgress />
        </Box>  
    )
  }

  return (
    <StyledContainer>
      <h1 style={{ marginBottom: "30px" }}>お知らせ</h1>

      {notices.map((notices) => (
        <StyledAccordion key={notices.notice_id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <h2>
                <b>{notices.title}</b>
              </h2>
              {formatDate(notices.start_date)}から{formatDate(notices.end_date)}
              まで
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              {/* Replace <p /> with actual newline characters (\n) */}
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {notices.content.replace(/<p \/>/g, "\n")}
              </pre>
            </Typography>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  /* 画面全体の背景色を白に変更 */
  height: 100vh; /* 画面の高さいっぱいに広がるように */
  margin: 0; /* マージンを0に設定 */
`;

const StyledAccordion = styled(Accordion)`
  width: 60%;
  margin-bottom: 12px;
  margin-right: auto;
  margin-left: auto;
  background: #f5f5dc;

  @media screen and (max-width: 600px) {
    width: 80%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
  }
`;

export default NoticesPage;
