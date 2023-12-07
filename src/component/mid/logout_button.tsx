import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: '/login' })}
      color="primary"
      variant="contained"
      sx={{ mt: 1, width: '60vw' }}
    >ログアウト
    </Button>
  );
}



