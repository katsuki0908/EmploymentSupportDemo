import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, useTheme} from '@mui/material';
import Image from 'next/image';

export default function Home() {

  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
      <Box sx={{backgroundColor:theme.palette.primary.main}}>
      <Image
        src='/splash.jpeg'
        // height={200}
        // width={350}
        alt="福岡大学"
        fill
      />
      </Box>
  )
}
