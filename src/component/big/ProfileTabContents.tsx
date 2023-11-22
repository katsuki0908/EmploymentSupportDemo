//プロフィールタブ
import * as React from 'react';
import { Box, Button } from "@mui/material"
import Profilelist from './profilelist';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ProfileProps } from '@/types/props';

export default function ProfileTabContents(props:ProfileProps){
    return (
        <Box sx={{width:'95%'}}>
            <Button variant='contained' href="/edit_profile" endIcon={<AddCircleIcon/>} sx={{mb:1,ml:1}}>連絡先編集</Button>
            <Profilelist
            Data = {{
                student_id:props.Data.student_id
            }}           
            />
        </Box>
    )
    



}