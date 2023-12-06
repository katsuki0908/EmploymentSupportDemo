import { Box, Typography } from "@mui/material";
import PageChangeButton from "../Atoms/page_change_button";

export default function GoToLogInPage() {

return(
    <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh' 
            }}
        >
            <p
                style={{
                    color: 'black',
                    fontFamily: 'Inter',
                    wordWrap: 'break-word',
                    marginBottom: '18px', // 조절된 간격
                }}
            >
                ログインが必要なページです
            </p>

            <p
                style={{
                    color: 'black',
                    fontFamily: 'Inter',
                    wordWrap: 'break-word',
                    marginBottom: '36px', // 조절된 간격
                    marginTop: '18px',
                }}
            >
                ログインしますか？
            </p>
        <PageChangeButton
        router_path_name="/login"
        />

    </div>
)
}