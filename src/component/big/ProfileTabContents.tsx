//プロフィールタブ
import * as React from 'react';
import { Box, Typography,Button } from "@mui/material"
import { Avatar } from "@mui/material"
import { Chip } from '@mui/material';
import  { Stack } from "@mui/material";
import { student_table } from "@prisma/client";
import { useState } from "react";
import Profilelist from './profilelist';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function ProfileTabContents(){
    return (
        <Box sx={{width:'95%'}}>
            <Button variant='contained' href="/edit_profile" endIcon={<AddCircleIcon/>} sx={{mb:1,ml:1}}>連絡先編集</Button>
            <Profilelist/>
        </Box>
    )
    



}