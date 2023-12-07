// 求人票閲覧ページ

import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";
import Box from '@mui/material/Box';

export default function EditJoblistPage() {
    return (
        <div>
            <Box sx={{ backgroundColor: 'secondary.main', height: '100vh' }}>
                <Header />
                <Joblists showCheckbox={false} showEditDeleteButtons={false} />
            </Box>
        </div>
    );
}