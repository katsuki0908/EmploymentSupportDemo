// 求人票閲覧ページ

import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";
import Box from '@mui/material/Box';
import { useSession } from "next-auth/react";
import GoToLogInPageDialog from "@/component/Molecules/go_to_login_page_dialog";

export default function EditJoblistPage() {
    const { data: session } = useSession();

    if (!session?.user?.user_id) {
        return (
            <GoToLogInPageDialog />
        );
    }

    return (
        <div>
            <Box sx={{ backgroundColor: 'secondary.main', height: '100vh' }}>
                <Header />
                <Joblists showCheckbox={false} showEditDeleteButtons={false} />
            </Box>
        </div>
    );
}