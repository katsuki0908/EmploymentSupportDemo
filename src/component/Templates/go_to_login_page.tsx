// import { Box, Typography } from "@mui/material";
import PageChangeButton from "../Atoms/page_change_button";

export default function GoToLogInPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <p
        style={{
          color: "black",
          fontFamily: "Inter",
          wordWrap: "break-word",
          marginBottom: "18px",
          fontSize: "1.3em",
        }}
      >
        ログインが必要なページです
      </p>

      <p
        style={{
          color: "black",
          fontFamily: "Inter",
          wordWrap: "break-word",
          marginBottom: "36px",
          marginTop: "10px",
        }}
      >
        ログインしますか？
      </p>
      <PageChangeButton router_path_name="/login" />
    </div>
  );
}
