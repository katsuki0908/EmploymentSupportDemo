//プロフィール編集ページ
import { useSession } from "next-auth/react"
import { useState } from "react";
import { Stack, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import {ProfileTextField} from '../component/mid/profile_text_field';
import { EditContact } from '../component/mid/contact_edit';
import Header from "../component/big/header";

const EditProfilePage = () => {
  const { data: session } = useSession();

  const [openDialog, setOpenDialog] = useState(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Box sx={{ backgroundColor: 'secondary.main', height: '100vh' }}>
        <Header />
        <Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
          {session ? (
            <EditContact student_id={session?.user.user_id} />
          ) : (
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>ユーザーが見つかりません</DialogTitle>
              <DialogContent>
                <p>もう一度、ログインしてください</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  閉じる
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Stack>
      </Box>
    </div>
  )
}

export default EditProfilePage;