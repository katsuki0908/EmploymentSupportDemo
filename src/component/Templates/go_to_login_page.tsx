import { Box, Typography } from "@mui/material";
import PageChangeButton from "../Atoms/page_change_button";

export default function GoToLogInPage() {

return(
    <Box>
        <Typography>
            ログインしてください
        </Typography>
        <PageChangeButton
        router_path_name="/login"
        />
    </Box>
)
}