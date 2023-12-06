import * as React from 'react';
import { Inter } from 'next/font/google'
import Header from '@/component/big/header';
import NoticesPage from '@/component/big/notice';
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import GoToLogInPageDialog from '@/component/Molecules/go_to_login_page_dialog'
import ErrorSnackbar from '@/component/mid/error_snack_bar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);//スナックバーの状態を管理するステート

  //通知機能：その他を含むキャリア活動が入力されているときに表示
  React.useEffect(() => {
    if (session?.user.user_type == 'admin') {
      const checkNotification = async () => {
        const response = await fetch('/api/others', {
          method: 'GET'
        });
        const data = await response.json();
        if (data && data.length > 0) { // その他を含むデータが存在する場合
          setOpenErrorSnackbar(true);
        }
      };
      checkNotification();
    }
  }, []);

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  if (!session?.user?.user_id) {
    return (
      <GoToLogInPageDialog />
    );
  }

  return (
    <>
      <Box sx={{ backgroundColor: 'secondary.main', height: '100vh' }}>
        <Header />
        <ErrorSnackbar
          errorMessage='未登録会社がキャリア活動に追加されています'
          open={openErrorSnackbar}
          handleClose={handleCloseErrorSnackbar}
          router_path_name='/usermanage3'
        />
        <NoticesPage />
      </Box>
    </>
  )
}