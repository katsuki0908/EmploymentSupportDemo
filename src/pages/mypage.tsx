//マイページ
import { Box } from "@mui/material";
import Header from "@/component/big/header";
import {Button} from "@mui/material";
import Careerlist from "@/component/big/career";
import { useSession } from "next-auth/react";
import { Session } from "inspector";

export default function(){

    const {data:session} = useSession();

    if (!session) {
        return <p>Loading...</p>;
      }

    if (session){
    return(
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
            <Header/>
            <Box
            sx={{
                width: '80%',
                height:'30%',
                mt:2,
                backgroundColor: 'blue',
                
            }}
            >
                プロフィール
            </Box>
            
            <Box
            sx={{
                width: '80%',
                height:'30%',
                mt:10,
                backgroundColor: 'blue',
                
            }}
            >
            キャリア活動
            </Box>
            <Button
            >
                修正
            </Button>
            <Careerlist/>
            </Box>
    )
        }
}