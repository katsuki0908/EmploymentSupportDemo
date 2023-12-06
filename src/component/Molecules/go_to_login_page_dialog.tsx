import { useState } from "react";
import { Box, Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";
import PageChangeButton from "../Atoms/page_change_button";

export default function GoToLogInPageDialog() {
  const [openDialog, setOpenDialog] = useState(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>ユーザーが見つかりません</DialogTitle>
        <DialogContent>
          <p>もう一度、ログインしてください</p>
          <PageChangeButton
            router_path_name="/login"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
}