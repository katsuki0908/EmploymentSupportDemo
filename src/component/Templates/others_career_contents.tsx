import * as React from 'react';
import { Box, Typography } from "@mui/material"
import { useSession } from 'next-auth/react';
import OthersCareerlist from '../Organisms/others_career_list';
import { action_table, career_path_table } from '@prisma/client';

export default function OthersCareerContents() {
  const { data: session } = useSession();
  const [selection_action, setSelection_action] = React.useState<action_table[]>([]);
  const [selection_career_name, setSelection_career_name] = React.useState<career_path_table[]>([]);

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

  return (
    <Box sx={{ width: '95%' }}>
      <Typography>
        その他を含むキャリア活動表示
      </Typography>
      <OthersCareerlist
        initialData={{ student_id: session?.user.user_id }}
        action_data={selection_action}
        career_path_data={selection_career_name}
      />
    </Box>
  )
} 