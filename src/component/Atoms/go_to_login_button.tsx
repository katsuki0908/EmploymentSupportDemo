import { Button } from "@mui/material";

export default function GoToLogInButton() {
    return (
        <Button 
        href="/login" 
        color="primary" 
        variant="contained"
        >ログイン画面へ
        </Button>
    );
  }