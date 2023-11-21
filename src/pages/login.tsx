//ログインページ
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Image from "next/image";
import ErrorSnackbar from '@/component/mid/error_snack_bar';
import { useSession, signIn, getCsrfToken } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { Palette } from '@mui/icons-material';

interface SignInProps {
  csrfToken: string;
}

export default function SignIn({csrfToken}: SignInProps) { //サインインページ
  const theme = useTheme();
  // const [uid, setUid] = useState(''); // IDの状態を管理するステート
  // const [password, setPassword] = useState(''); // パスワードの状態を管理するステート
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);//スナックバーの状態を管理するステート
  const [errorMessage, setErrorMessage] = useState('');//エラーメッセージの状態を管理するステート
  const {data: session} = useSession();
  const router = useRouter();

  // const handleSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const userCredentials = { uid:uid,password:password };
  //   // const response = await signIn('credentials', {userCredentials, callbackUrl: '/top' });
  
  //   // if(!response) {
  //   //   setErrorMessage(session?.auth_data.message);
  //   //   setOpenErrorSnackbar(true);
  //   // }
  // };
  React.useEffect(() => {
    // セッションが存在し、ユーザーがログインしていればトップページに遷移する
    if (session?.user?.name) {
      router.push('/top'); // または任意のパス
    }
    else if(session?.user){
      setErrorMessage('ログイン失敗');
      setOpenErrorSnackbar(true);
    }
  }, [session, router]);


  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };
  return (
    <>
        <CssBaseline />
        <Box
          sx={{
            width:'100vw',
            height:'100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'secondary.main'
            
          }}
        >

          <Box 
          sx={{ mt: 10,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height:200,
                width: 300
             }}>
            
          <Image
        src='/Logomarkforjobsearchservices.jpeg'
        // height={200}
        // width={350}
        alt="福岡大学"
        width={300}
        height={200}
      />
          </Box>

          <Box 
          component="form" 
          noValidate method='post' 
          action="/api/auth/callback/credentials" 
          sx={{ mt: 20,
                alignItems: 'center',
                width:"90%",
          }}>
            <input name="csrfToken" type='hidden' defaultValue={csrfToken} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="uid"
              label="学籍番号"
              name="uid"
              autoComplete="uid"
              autoFocus
              // value={uid}
              // onChange={(e) => setUid(e.target.value)}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              // value={password}
              variant='outlined'
              // onChange={(e) => setPassword(e.target.value)}
              sx={{borderRadius: 10}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size='large'
              sx={{ mt: 15, mb: 1 ,borderRadius: 10,backgroundColor: theme.palette.primary.main}}
            >
              ログイン
            </Button>
            <ErrorSnackbar
              errorMessage={errorMessage}
              open={openErrorSnackbar}
              handleClose={handleCloseErrorSnackbar}
            />
          </Box>
        </Box>
    </>
  );}

  export async function getServerSideProps(context:GetServerSidePropsContext) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  };

  