//プロフィール編集ページ
import { useSession } from "next-auth/react"
import {useState} from "react";
import {Stack,Button,Box} from '@mui/material';
// import {ProfileTextField} from '../component/mid/profile_text_field';
import {EditContact} from '../component/mid/contact_edit';
import Header from "../component/big/header";

const EditProfilePage = () => {
  const {data:session} = useSession();

    return(
      <div>
        <Box sx={{backgroundColor:'secondary.main',height:'100vh'}}>
        <Header />
          <Stack spacing={3} direction = "column" justifyContent="center" alignItems="center">
            {session ?<EditContact student_id={session?.user.user_id}/> : null}
          </Stack>
        </Box>
      </div>
    )
  }

export default EditProfilePage;