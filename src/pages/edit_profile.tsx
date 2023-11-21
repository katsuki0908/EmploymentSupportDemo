//キャリア活動編集ページ
import Careerlist from "@/component/big/career_list"
import CareerAddFormDialog from "@/component/big/career_add_form"
import { Box, Typography } from "@mui/material"
import Header from "@/component/big/header"
import { useSession } from "next-auth/react"

export default function() {
    const {data:session} = useSession();//セッション情報取得
    return (
            <Box sx={{backgroundColor:'white',height:'100vh'}}>
            <Header/>
            キャリア活動編集
            <CareerAddFormDialog
            initialData={{
            student_id: session?.user.user_id,
            }} 
            />
            <Typography sx={{mb:2}}>
            キャリア活動一覧
            </Typography>
            <Careerlist/>
            </Box>
    )
}