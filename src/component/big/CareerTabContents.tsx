//キャリアタブ
import * as React from 'react';
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Careerlist from './career_list';
import { FormDialogProps } from '@/types/props';

export default function CareerTabContents(props:FormDialogProps) {
  return (
        <>
            <Button variant='contained' href="/edit_career" endIcon={<AddCircleIcon/>} sx={{mb:1}}>追加・修正・削除</Button>
            <Careerlist
            initialData={{student_id:props.initialData.student_id}}
            action_data={props.action_data}
            career_path_data={props.career_path_data}
            />
        </>
  );}
