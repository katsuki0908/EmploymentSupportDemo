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
  const { data:session } = useSession();
     
  const [profile,SetProfile]  = useState<student_table | null>(null)

  React.useEffect(() => { //プロフィールデータ取得
    fetch('/api/user_database',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: session?.user?.user_id})
    })
      .then((response) => response.json())
      .then((data) => SetProfile(data));
  }, []);




  //   if (!session?.user?.user_id) {
  //     return <p>Loading...</p>;
  //   }

  return(
        <Box>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <Avatar
                    alt={profile?.student_id}
                    src={profile?.face_photo}
                    />
                 </Grid>
                 <Grid xs={4}>
                    <Stack> {/*map関数にしたほうがいい*/}
                        <Chip label={profile?.student_id} variant="outlined" sx={{mt:1}} />
                        <Chip label={profile?.gender} variant="outlined" sx={{mt:1}}/>
                        <Chip label={profile?.cource_id} variant="outlined" sx={{mt:1}}/>
                        <Chip label={profile?.grade} variant="outlined" sx={{mt:1}}/>
                        <Chip label={profile?.graduation_year} variant="outlined" sx={{mt:1}}/>
                     </Stack>
                 </Grid>
                 <Grid xs={4}>
                     <Stack>
                        <Chip label={profile?.contact1} variant="outlined" sx={{mt:1}}/>
                        <Chip label={profile?.student_id} variant="outlined"sx={{mt:1}} />
                        <Chip label={profile?.student_id} variant="outlined"sx={{mt:1}} />
                        <Chip label="フリガナ" variant="outlined" sx={{mt:1}}/>
                        <Chip label="フリガナ" variant="outlined"sx={{mt:1}} />
                    </Stack>
                 </Grid>
            </Grid>
        </Box>
  )



}