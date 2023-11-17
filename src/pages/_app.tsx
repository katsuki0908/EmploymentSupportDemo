import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@mui/material'
import theme from '@/styles/theme'


export default function App({
  Component,
  pageProps:{ session, ...pageProps},
}: AppProps) {
  
  return (
    <ThemeProvider theme={theme}>
  <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </ThemeProvider>
  )
}
