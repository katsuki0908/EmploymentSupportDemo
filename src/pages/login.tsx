//ログインページ
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Image from "next/image";
import ErrorSnackbar from '@/component/mid/error_snack_bar';
import { useSession, signIn } from 'next-auth/react';


export default function SignIn() { //サインインページ
  const theme = useTheme();
  const [uid, setuid] = useState(''); // IDの状態を管理するステート
  const [password, setpassword] = useState(''); // パスワードの状態を管理するステート
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);//スナックバーの状態を管理するステート
  const [errorMessage, setErrorMessage] = useState('');//エラーメッセージの状態を管理するステート
  const {data: session} = useSession();

  const handleSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userCredentials = { uid:uid,password:password };
    const response = await signIn('credentials',userCredentials);
    if(session?.user?.name) {
      setErrorMessage('エラー')
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseErrorSnackbar = () => 
  {
    setOpenErrorSnackbar(false);
  };

  return (
    <>
        <CssBaseline />
        <Box
          sx={{
            width:395,
            height:844,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >

          <Box 
          sx={{ mt: 10,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'blue',
             }}>
              ロゴマーク
          {/* <Image
        src={fu_logo}
        height={200}
        width={350}
        alt="福岡大学"
      /> */}
          </Box>

          <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ mt: 25,
                alignItems: 'center',
                width:"90%",
          }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="uid"
              label="学籍番号"
              name="uid"
              autoComplete="uid"
              autoFocus
              value={uid}
              onChange={(e) => setuid(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              value={password}
              variant='outlined'
              onChange={(e) => setpassword(e.target.value)}
              sx={{borderRadius: 10}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size='large'
              sx={{ mt: 30, mb: 1 ,borderRadius: 10,backgroundColor: theme.palette.primary.main}}
            >
              サインイン
            </Button>
            <ErrorSnackbar
              errorMessage={errorMessage}
              open={openErrorSnackbar}
              handleClose={handleCloseErrorSnackbar}
            />
          </Box>
        </Box>
    </>
  );
}