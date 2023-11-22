//プロフィール
import * as React from 'react';
import { Box,Table,TableRow,TableBody,TableCell } from "@mui/material"
import { cource_table, student_table, user_table } from "@prisma/client";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { ProfileProps } from '@/types/props';

type ExtendedProfile = student_table & {
  user?: user_table;
  cource?: cource_table;
};

export default function Profilelist(props:ProfileProps){
  const { data:session } = useSession();
  const [profile,SetProfile]  = useState<ExtendedProfile | null>(null)

//プロフィールデータ取得
  React.useEffect(() => {
    const url =`/api/profile?student_id=` + props.Data.student_id;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => SetProfile(data));
  }, [session]);
  
    return (
        <Box sx={{width:'95vw'}}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>福大ID</TableCell>
            <TableCell>{profile?.student_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>氏名</TableCell>
            <TableCell>{profile?.user?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>フリガナ</TableCell>
            <TableCell>{profile?.user?.furigana}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>性別</TableCell>
            <TableCell>{profile?.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>卒業年度</TableCell>
            <TableCell>{profile?.graduation_year}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>コース</TableCell>
            <TableCell>{profile?.cource?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>住所</TableCell>
            <TableCell>{profile?.personal_address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>電話番号</TableCell>
            <TableCell>{profile?.personal_phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>メールアドレス</TableCell>
            <TableCell>{profile?.personal_email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>緊急＿住所</TableCell>
            <TableCell>{profile?.emergency_address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>緊急電話番号</TableCell>
            <TableCell>{profile?.emergency_phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
    )
}