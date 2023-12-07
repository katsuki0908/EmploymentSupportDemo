// 求人票編集ページ
import Header from "@/component/big/header";
import Joblists from "@/component/big/joblist";
import JoblistAddFormDialog from "@/component/big/joblist_add_form";
import Head from "next/head";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";
export default function EditJoblistPage() {
    const { data: session } = useSession();

    const StyledTypography = styled.h1`
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
        
    // 追加、編集、削除ボタンの動作
    return (
        <div>
            <Head>
                <title>求人票編集</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <StyledTypography>求人票編集</StyledTypography>
            {/* 追加、編集、削除ボタン */}
            <JoblistAddFormDialog />
            <Joblists showCheckbox={false} showEditDeleteButtons={true} />
        </div>
    );
}