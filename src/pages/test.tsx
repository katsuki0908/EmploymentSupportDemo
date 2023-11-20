// テスト用

import { useEffect, useState } from "react";
import Header from "@/component/big/header";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { json } from "stream/consumers";
import { Message } from "@mui/icons-material";


const NoticesPage = () => {
    useEffect(() => {
        const test = async () => {
          const startDate = new Date('2023-11-10T12:00:00');
          const endDate = new Date('2023-11-15T18:30:00');
          
          const dataToSend1 = {
           title:'データ追加テスト2',
           content:'データの追加テスト2',
           start_date: startDate,
           end_date: endDate,
          };

          const dataToSend2 = {
            notice_id:10,
            title:'データ追加テスト2→変更',
            content:'データの追加テスト2→変更',
            start_date: startDate,
            end_date: endDate,
           };

           const dataToSend3 = {
            notice_id:12,
           }

           const dataToSend4 = {
            graduation_year:2023,
           }

           const dataToSend5 = {
            student_id:"TD232000",
            gender:"F"
           }
           
          const response = await fetch("/api/profile", {
            method: "PUT",
            body:JSON.stringify(dataToSend5)
          });

          // const response = await fetch("/api/profile?student_id=TD232000", {
          //   method: "GET",
          // });

          
          console.log(response.json());
        }
    
        test(); // test関数をuseEffect内で呼び出す
      }, []); 

  return (
   <><></></>
  );
};

export default NoticesPage;