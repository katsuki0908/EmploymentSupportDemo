//ログインページ
import * as React from 'react';
import { Button, CssBaseline, TextField, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from "next/image";
import ErrorSnackbar from '@/component/mid/error_snack_bar';
import { useSession, getCsrfToken } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Head from 'next/head';

interface SignInProps {
  csrfToken: string;
}

export default function SignIn({ csrfToken }: SignInProps) { //サインインページ
  const theme = useTheme();
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);//スナックバーの状態を管理するステート
  const [errorMessage, setErrorMessage] = React.useState('');//エラーメッセージの状態を管理するステート
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    // セッションが存在し、ユーザーがログインしていればトップページに遷移
    if (session?.user?.name) {
      router.push('/top'); // または任意のパス
    } else if (session?.user) { // ログイン失敗時の処理
      setErrorMessage('ログイン失敗');
      setOpenErrorSnackbar(true);
    }
  }, [session, router]);

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const StyledTextfild = styled(TextField)`
  width: 338px;
  margin-bottom: 12px;
  margin-right: auto;
  margin-left: auto;

  @media screen and (max-width: 600px) {
    width: 90%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
  }
  `;
  const StyledButton = styled(Button)`
  width: 338px;
  @media screen and (max-width: 600px) {
    width: 90%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
  }
  `;

  return (
    <>
      <Head>
        <title>就職支援システム</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',            
            justifyContent: 'center',
            minHeight: '100vh', // 화면 전체 높이를 차지하도록 설정
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
              src='/fu_logo_pc.png'
              alt="福岡大学"
              width={240}
              height={100}
            />
            <p 
              style={{
                color: '#9D2328', 
                fontSize: '1.5em', 
                fontWeight: '900', 
                marginBottom:'0px', 
                marginTop:'10px'
                }}>
                FIND YOUR CAREER
            </p>
            <p
              style={{
                color: '#9D2328', 
                fontSize: '1.1em', 
                fontWeight: '900',
                 marginTop:'10px'}}>
                福岡大学就職支援
            </p>
          </Box>

          <Box 
          component="form" 
          noValidate method='post' 
          action="/api/auth/callback/credentials" 
          sx={{ mt: 20,
                width:"90%",
                marginTop: '30px',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
          }}>
            <input name="csrfToken" type='hidden' defaultValue={csrfToken} />
            <StyledTextfild
              required
              id="uid"
              label="学籍番号"
              name="uid"
              autoComplete="uid"
              autoFocus
            />
            <StyledTextfild
              required
              name="password"
              label="パスワード"
              type="password"
              id="password"
              variant='outlined'
              sx={{borderRadius: 10}}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size='large'
              sx={{ 
                mt: 15, 
                mb: 1 ,
                borderRadius: 10,
                backgroundColor: theme.palette.primary.main}}
              style={{
                marginTop: '30px'
              }}
            >
              ログイン
            </StyledButton>
            <ErrorSnackbar
              errorMessage={errorMessage}
              open={openErrorSnackbar}
              handleClose={handleCloseErrorSnackbar}
            />
          </Box>
        </Box>

        <Box
          component="form"
          noValidate method='post'
          action="/api/auth/callback/credentials"
          sx={{
            mt: 20,
            alignItems: 'center',
            width: "90%",
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            variant='outlined'
            sx={{ borderRadius: 10 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size='large'
            sx={{ mt: 15, mb: 1, borderRadius: 10, backgroundColor: theme.palette.primary.main }}
          >
            ログイン
          </Button>
          <ErrorSnackbar
            errorMessage={errorMessage}
            open={openErrorSnackbar}
            handleClose={handleCloseErrorSnackbar}
          />
        </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

