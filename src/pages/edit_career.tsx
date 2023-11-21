//キャリア活動編集ページ
import React, { useState } from "react"
import Careerlist from "@/component/big/career_list"
import CareerAddFormDialog from "@/component/big/career_add_form"
import { Box, Typography } from "@mui/material"
import Header from "@/component/big/header"
import { useSession } from "next-auth/react"
import { action_table, career_path_table } from "@prisma/client";

export default function() {
    const {data:session} = useSession();//セッション情報取得
    const [selection_action, setSelection_action] = useState<action_table[]>([]);
    const [selection_career_name, setSelection_career_name] = useState<career_path_table[]>([]);

      React.useEffect(() => {//会社名・アクション選択肢の取得
    const fetchData = async () => {
      try {
        const action = await fetch("/api/action_database?action_name" + selection_action, {
          method: 'GET',
        });
        if (action.ok) {
          const action_data = await action.json();
          setSelection_action(action_data);
        } else {
          console.error("Error while loading career data: HTTP status ", action.status);
        }
        const career_name = await fetch("/api/career_path_database?name" + selection_career_name, {
          method: 'GET',
        });
        if (action.ok) {
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
            <Box sx={{backgroundColor:'secondary.main',height:'100vh'}}>
            <Header/>
            キャリア活動編集
            <Box>
            <CareerAddFormDialog
            initialData={{
            student_id: session?.user.user_id,
            }} 
            action_data ={selection_action}
            career_path_data = {selection_career_name}
            />
            <Typography sx={{mb:2}}>
            キャリア活動一覧
            </Typography>
            <Careerlist
            initialData={{student_id: session?.user.user_id}}
            action_data={selection_action}
            career_path_data={selection_career_name}
            />
            </Box>
            </Box>
    )
}