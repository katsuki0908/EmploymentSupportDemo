import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, SessionProvider } from "next-auth/react";
import React from "react";
import theme from "@/styles/theme";

interface AuthProps {
  children: React.ReactNode;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    </ThemeProvider>
  );
}

function Auth({ children }: AuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.user.user_id;

  useEffect(() => {
    // ローディング中か、ログインページにいる場合は何もしない
    if (status === "loading" || router.pathname === "/login") {
      return;
    }

    // ユーザーがいない場合はログインページにリダイレクト
    if (!isUser) {
      router.push("/login");
    }
  }, [isUser, status, router]);

  if (isUser || router.pathname === "/login") {
    return children; // セッションが有効、またはログインページの場合、子コンポーネントをレンダリング
  }

  // ローディング中の表示
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
