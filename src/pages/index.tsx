import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user?.user_id) {
            router.push('/top');
        } else {
            router.push('/login');
        }
    }, [session, router]); 
    return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
          }}
        >
          <CircularProgress />
        </Box>  
)}
