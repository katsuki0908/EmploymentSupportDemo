//プロフィール
import * as React from 'react';
import { Box } from "@mui/material"
import { Avatar } from "@mui/material"
import { Chip } from '@mui/material';
import  { Stack } from "@mui/material";
import { student_table } from "@prisma/client";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import Grid from '@mui/material/Unstable_Grid2';


export default function Profilelist(){
  //const { data:session } = useSession();
     
  const [profile,SetProfile]  = useState<student_table | null>(null)

//プロフィールデータ取得
  React.useEffect(() => {
    //const userId = session?.user?.user_id;
    
    // セッションのユーザーIDが存在する場合、クエリパラメータとして付与
    const url = userId ? `/api/user_database?user_id=${userId}` : '/api/user_database';
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => SetProfile(data));
  }, []);
  
    // if (!session?.user?.user_id) {
    //   return <p>Loading...</p>;
    // }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <Avatar
                        alt={profile?.student_id}
                        src={profile?.face_photo}
                    />
                </Grid>
                <Grid xs={4}>
                    <Stack>
                        {
                            [
                                profile?.student_id,
                                profile?.gender,
                                profile?.cource_id,
                                profile?.grade,
                                profile?.graduation_year
                            ].map((label, index) => (
                                <Chip key={index} label={label} variant="outlined" sx={{ mt: 1 }} />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid xs={4}>
                    <Stack>
                        {
                            [
                                profile?.contact1,
                                profile?.student_id,  
                                profile?.student_id,  
                                "フリガナ",  
                                "フリガナ"   
                            ].map((label, index) => (
                                <Chip key={index} label={label} variant="outlined" sx={{ mt: 1 }} />
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
    



}