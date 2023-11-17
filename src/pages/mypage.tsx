//マイページ
import { Box } from "@mui/material";
import Header from "@/component/big/header";
import {Button} from "@mui/material";
import Careerlist from "@/component/big/career_list";
import { useSession } from "next-auth/react";
import Profilelist from "@/component/big/profile";

export default function(){

  const { data:session } = useSession();
console.log('セッション情報',session?.user?.name)

  if (!session?.user?.name) {
      return(
        <Box sx={{backgroundColor:"white",height:900}}> 
          ログインしてください
        </Box>
      )
    }

  return(
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
            <Header/>
            <Box
    sx={{
        width: '90%',
        height:'30%',
    }}
>
  
    <Profilelist/>
</Box>
            <Box
            sx={{
                width: '90%',
                height:'30%',
                mt:2,
                backgroundColor: 'white',
            }}
            >
              <Careerlist/>
              {session.user.name}
              {session.user.user_id}
            </Box>
            <Button href="/edit_career">修正</Button>
            </Box>
  )
}