import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Snackbar } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ja from "date-fns/locale/ja";
// import { addDays } from "date-fns"; // import addDays from date-fns library
import MuiAlert from "@mui/material/Alert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styled from "styled-components";
import Box from "@mui/material/Box";

const NewNotice = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  // const [endDateError, setEndDateError] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSuccessClose = () => {
    setSuccessMessage(null);
  };

  const handleSubmit = async () => {
    try {
      // 入力値が空であるか確認する
      if (title.trim() === "" || content.trim() === "") {
        setTitleError(title.trim() === "");
        setContentError(content.trim() === "");
        return;
      }

      const response = await fetch("/api/notice", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        }),
      });

      if (response.ok) {
        setSuccessMessage("お知らせが作成されました！");
        setTimeout(() => {
          setSuccessMessage(null);
          router.replace(router.asPath);
        }, 3000); // Auto close success message after 3 seconds
        handleClose();
        window.location.reload();
      } else {
        console.error("Notice creation error");
      }
    } catch (error) {
      console.error("Notice creation error: ", error);
    }
  };

  // const handleStartDateChange = (date: Date | null) => {
  //   if (date !== null) {
  //     setStartDate(date);
  //   }
  // };

  // const handleEndDateChange = (date: Date | null) => {
  //   if (date !== null) {
  //     setEndDate(date);
  //   }
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledButton = styled(Button)`
    width: 246px;
    @media screen and (max-width: 600px) {
      width: 70%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
    }
  `;
  const StyledDiv = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 16px;
    margintop: 16px;
    @media screen and (max-width: 600px) {
      display: flex;
      flex-direction: column;
      margin: 0 auto; /* 가로 폭이 600px 이하일 때 스타일 변경 */
    }
  `;
  return (
    <>
      <React.Fragment>
        <StyledButton
          variant="outlined"
          onClick={handleClickOpen}
          style={{ marginBottom: "20px", fontSize: "1.0em" }}
        >
          <AddCircleIcon style={{ marginRight: "10px" }} />
          お知らせ追加
        </StyledButton>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle>お知らせ追加</DialogTitle>
          <DialogContent>
            <DialogContentText>お知らせを入力してください。</DialogContentText>

            <TextField
              required
              fullWidth
              label="Title"
              id="fullWidth"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false); // テキストが変更されるとエラー状態の初期化
              }}
              margin="normal"
              error={titleError} // エラー状態の適用
              helperText={titleError ? "タイトルは必須入力です。" : ""}
            />

            <TextField
              required
              fullWidth
              id="outlined-multiline-static"
              label="Content"
              type="text"
              multiline
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setContentError(false); // テキストが変更されるとエラー状態の初期化
              }}
              margin="normal"
              error={contentError} // エラー状態の適用
              helperText={contentError ? "内容は必須入力です。" : ""}
            />

            <StyledDiv>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ja}
              >
                {/* <DatePicker
                  label="開始日"
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{ mt: 1 }}
                  inputFormat="yyyy年MM月dd日"
                  mask="____年__月__日"
                /> */}
              </LocalizationProvider>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ja}
              >
                {/* <DatePicker
                  label="終了日"
                  value={endDate}
                  onChange={handleEndDateChange}
                  sx={{ mt: 1 }}
                  inputFormat="yyyy年MM月dd日"
                  mask="____年__月__日"
                  minDate={addDays(new Date(), 1)}
                /> */}
              </LocalizationProvider>
            </StyledDiv>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>戻る</Button>
            <Button onClick={handleSubmit}>追加</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {/* Snackbar for success message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSuccessClose}
        >
          お知らせが登録されました！
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default NewNotice;
