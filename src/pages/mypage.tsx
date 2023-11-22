import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { action_table, career_path_table } from '@prisma/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import Header from "@/component/big/header";
import CareerTabContents from '@/component/big/CareerTabContents';
import ProfileTabContents from '@/component/big/ProfileTabContents';
import GoToLogInButton from '@/component/Atoms/go_to_login_button';

export default function MyPage() {
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selection_action, setSelection_action] = useState<action_table[]>([]);
  const [selection_career_name, setSelection_career_name] = useState<career_path_table[]>([]);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  React.useEffect(() => {//会社名・アクション選択肢の取得
    const fetchData = async () => {
      try {
        const action = await fetch("/api/career_action", {
          method: 'GET',
        });
        if (action.ok) {
          const action_data = await action.json();
          setSelection_action(action_data);
        } else {
          console.error("Error while loading career data: HTTP status ", action.status);
        }
        const career_name = await fetch("/api/career_path", {
          method: 'GET',
        });
        if (career_name.ok) {
          const career_data = await career_name.json();
          setSelection_career_name(career_data);
        } else {
          console.error("Error while loading career data: HTTP status ", career_name.status);
        }
      } catch (error) {
        console.error("Error while loading career data: ", error);
      }
    };
    fetchData();
  }, []);


  if (!session?.user?.name) {
    return (
      <Box sx={{ backgroundColor: "white", height: '100vh' }}>
        ログインしてください
        <GoToLogInButton/>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
      }}
    >
      <Header />
      <Typography variant='h6'>
        マイページ
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{mb:2}}>
        <Tab icon={<AccountCircleIcon/>} label="プロフィール" iconPosition='end' />
        <Tab icon={<WorkIcon/>} label="マイキャリア" iconPosition='end' />
      </Tabs>
      <Box
        sx={{
          width: '100%',
          height: '30%',
        }}
      >
        {selectedTab === 0 && <ProfileTabContents
        Data={{student_id:session.user.user_id}}
        />}
        {selectedTab === 1 && <CareerTabContents
        initialData={{student_id:session?.user.user_id}}
        action_data={selection_action}
        career_path_data={selection_career_name}
        />}
      </Box>
    </Box>
  );
}
