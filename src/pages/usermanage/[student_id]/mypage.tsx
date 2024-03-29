import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { action_table, career_path_table } from "@prisma/client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import Header from "@/component/big/header";
import CareerTabContents from "@/component/big/CareerTabContents";
import ProfileTabContents from "@/component/big/ProfileTabContents";
import Head from "next/head";
import styled from "styled-components";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export default function MyPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();
  const [selection_action, setSelection_action] = useState<action_table[]>([]);
  const [selection_career_name, setSelection_career_name] = useState<
    career_path_table[]
  >([]);
  // 動的ルーティングのパラメータを取得
  const params = useParams();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  React.useEffect(() => {
    //会社名・アクション選択肢の取得
    const fetchData = async () => {
      try {
        const action = await fetch("/api/career_action", {
          method: "GET",
        });
        if (action.ok) {
          const action_data = await action.json();
          setSelection_action(action_data);
        } else {
          console.error(
            "Error while loading career data: HTTP status ",
            action.status,
          );
        }
        const career_name = await fetch("/api/career_path", {
          method: "GET",
        });
        if (career_name.ok) {
          const career_data = await career_name.json();
          setSelection_career_name(career_data);
        } else {
          console.error(
            "Error while loading career data: HTTP status ",
            career_name.status,
          );
        }
      } catch (error) {
        console.error("Error while loading career data: ", error);
      }
    };
    fetchData();
  }, []);

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

  if (session?.user.user_type == "student") {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>マイページ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header />
        <StyledTypography>マイページ</StyledTypography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 2 }}
        >
          <Tab
            icon={<AccountCircleIcon />}
            label="プロフィール"
            iconPosition="end"
          />
          <Tab icon={<WorkIcon />} label="マイキャリア" iconPosition="end" />
        </Tabs>
        <Box
          sx={{
            width: "100%",
            height: "30%",
          }}
        >
          {selectedTab === 0 && (
            <ProfileTabContents Data={{ student_id: params.student_id }} />
          )}
          {selectedTab === 1 && (
            <CareerTabContents
              initialData={{
                student_id: params.student_id,
                user_type: session?.user.user_type,
              }}
              action_data={selection_action}
              career_path_data={selection_career_name}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
