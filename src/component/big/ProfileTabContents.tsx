//プロフィールタブ
import * as React from 'react';
import { Box, Button } from "@mui/material"
import Profilelist from './profilelist';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ProfileProps } from '@/types/props';
import styled from 'styled-components';

export default function ProfileTabContents(props:ProfileProps){
    const StyledButton = styled(Button)`
    width: 246px;
    background: #FFF;
    color: #9D2328;
    margin: 10px auto;
    border: 1px #9D2328 solid;
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        width: 70%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
    }
    `;
    return (
        <Box sx={{width:'100%'}}>
            <StyledButton 
                href="/edit_profile" 
                endIcon={<AddCircleIcon/>} 
                sx={{mb:1}}>
                    連絡先編集
            </StyledButton>
            <Profilelist
            Data = {{
                student_id:props.Data.student_id
            }}           
            />
        </Box>
    )
    



}