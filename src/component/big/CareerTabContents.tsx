//キャリアタブ
import * as React from "react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Careerlist from "./career_list";
import { FormDialogProps } from "@/types/props";
import styled from "styled-components";

export default function CareerTabContents(props: FormDialogProps) {
  const StyledButton = styled(Button)`
    width: 246px;
    background: #fff;
    color: #9d2328;
    margin: 10px auto;
    border: 1px #9d2328 solid;
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
      width: 70%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
    }
  `;

  return (
    <>
      {props.initialData.user_type !== "teacher" && (
        <StyledButton
          href="/edit_career"
          endIcon={<AddCircleIcon />}
          sx={{ mb: 1 }}
        >
          追加・修正・削除
        </StyledButton>
      )}
      <Careerlist
        initialData={{
          student_id: props.initialData.student_id,
          user_type: props.initialData.user_type,
        }}
        action_data={props.action_data}
        career_path_data={props.career_path_data}
      />
    </>
  );
}
