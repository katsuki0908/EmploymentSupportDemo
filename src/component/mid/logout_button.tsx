import { signOut } from "next-auth/react";
import { Box, Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutButton() {
  return (
      <Button 
      onClick={() => signOut({callbackUrl: '/login'})} 
      variant="contained"
      style={{width:'50vw', height: '65', background: 'white', color: '#9D2328', fontSize: '100%'}}
      >
        <LogoutIcon />
        ログアウト
      </Button>
  );
}



  