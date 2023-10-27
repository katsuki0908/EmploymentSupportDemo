//ログインページ
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { maxHeaderSize } from 'http';
import { url } from 'inspector';
import Image from "next/image";
import fu_logo from "/public/images/fu_logo.png";
import ErrorSnackbar from '@/component/mid/error_snack_bar';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';


const defaultTheme = createTheme();

export default function SignIn() { //サインインページ

  const [uid, setuid] = useState(''); // IDの状態を管理するステート
  const [password, setpassword] = useState(''); // パスワードの状態を管理するステート
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);//スナックバーの状態を管理するステート
  const [errorMessage, setErrorMessage] = useState('');//エラーメッセージの状態を管理するステート
  const router = useRouter();

  //   event.preventDefault();
  //   try {
  //       const response = await fetch('/api/api_mid',{
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         body: JSON.stringify({uid,password})
  //       });
      
  //       const auth_message = await response.json();

  //       if(auth_message.message == '認証成功'){
  //         router.push('/joboffer');
  //       }
  //       else console.log(auth_message.error)
  //         setErrorMessage(auth_message.error);
  //         setOpenErrorSnackbar(true);
  //   } cat
  const handleSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userCredentials = { uid:uid,password:password };
    await signIn('credentials',userCredentials);
  };

  const handleCloseErrorSnackbar = () => 
   {
    setOpenErrorSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          sx={{
            width:395,
            height:844,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: 'url("/images/product/background.jpg")',
          }}
        >

          <Box 
          sx={{ mt: 10,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
             }}>
          <Image
        src={fu_logo}
        height={200}
        width={350}
        alt="福岡大学"
      />
          </Box>

          <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ mt: 10,
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
              color='primary'
              sx={{ mt: 8, mb: 1 ,borderRadius: 10}}
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
    </ThemeProvider>
  );
}