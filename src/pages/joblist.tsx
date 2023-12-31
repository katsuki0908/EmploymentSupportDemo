// 求人票閲覧ページ

import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import GoToLogInPageDialog from "@/component/Molecules/go_to_login_page_dialog";
import Head from "next/head";
import styled from "styled-components";
import { Typography } from "@mui/material";

export default function EditJoblistPage() {
  const { data: session } = useSession();

  if (!session?.user?.user_id) {
    return <GoToLogInPageDialog />;
  }
  const StyledTypography = styled(Typography)`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2em;
    font-weight: 700;

    margin-bottom: 10px;
    @media screen and (max-width: 600px) {
      // width: 80%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
    }
  `;
  return (
    <div>
      <Head>
        <title>求人票閲覧ページ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: "100vh" }}>
        <Header />
        <StyledTypography>求人票</StyledTypography>
        <Joblists showCheckbox={false} showEditDeleteButtons={false} />
      </Box>
    </div>
  );
}
