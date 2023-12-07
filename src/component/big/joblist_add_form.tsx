import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  SelectChangeEvent,
  Container,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete } from "@mui/material";
import { career_path_table } from "@prisma/client";
import { useValueWithTimezone } from "@mui/x-date-pickers/internals/hooks/useValueWithTimezone";
import styled from "styled-components";

export default function JoblistAddFormDialog() {
  const [selection_career_name, setSelection_career_name] = useState<
    career_path_table[]
  >([]);
  React.useEffect(() => {
    // 会社名・アクション選択肢の取得
    const fetchData = async () => {
      try {
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

  // 応募形式、進路先、備考の設定
  const [formData, setFormData] = useState({
    application_format: "",
    career_path_id: -1,
    notes: "",
  });
  // 送付日の設定 家永:DBでnull許容できた方がよさそう
  const [submission_date, setSubmissionDate] = useState<Date | null>(
    new Date(),
  );
  // 来学日の設定 家永:DBでnull許容できた方がよさそう
  const [visit_date, setVisitDate] = useState<Date | null>(new Date());
  // 開始日の設定
  const [start_date, setStartDate] = useState<Date | null>(new Date());
  // 終了日の設定 初期設定は一週間後
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7); // 現在の日時から7日後を計算
  const [end_date, setEndDate] = useState<Date | null>(oneWeekLater);
  // ダイアログの開閉フラグ
  const [open, setOpen] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmissionDateChange = (date: Date | null): void => {
    setSubmissionDate(date);
  };
  const handleVisitDateChange = (date: Date | null): void => {
    setVisitDate(date);
  };
  const handleStartDateChange = (date: Date | null): void => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date | null): void => {
    setEndDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    resetFormError();
  };

  // 求人票を追加する
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let hasError = false;
    if (formData.career_path_id === -1) {
      setFormError((prevState) => ({ ...prevState, career_path_id: true }));
      hasError = true;
    } else {
      setFormError((prevState) => ({ ...prevState, career_path_id: false }));
    }
    if (formData.application_format.trim() === "") {
      setFormError((prevState) => ({ ...prevState, application_format: true }));
      hasError = true;
    } else {
      setFormError((prevState) => ({
        ...prevState,
        application_format: false,
      }));
    }

    if (hasError) {
      // console.error("エラーがあります。submitを送信できません。");
      return;
    }

    const response = await fetch("/api/joblist", {
      method: "POST",
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        application_format: formData.application_format,
        submission_date: submission_date,
        visit_date: visit_date,
        career_path_id: formData.career_path_id,
        notes: formData.notes,
        start_date: start_date,
        end_date: end_date,
      }),
    });
    if (response.ok) {
      // レスポンスが正常であればページをリロード
      window.location.reload();
    } else {
      // エラー処理
      console.error("フォームの送信に失敗しました。");
    }
    handleClose();
  };

  // 必須入力項目の設定
  const [formError, setFormError] = useState({
    application_format: false,
    career_path_id: false,
    start_date: false,
    end_date: false,
  });
  // 必須入力項目の初期化関数
  const resetFormError = () => {
    setFormError({
      application_format: false,
      career_path_id: false,
      start_date: false,
      end_date: false,
    });
  };

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
    <div>
      <Container>
        <StyledButton
          onClick={handleClickOpen}
          endIcon={<AddCircleIcon />}
          sx={{ margin: 1 }}
        >
          追加
        </StyledButton>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">求人票入力</DialogTitle>
        <DialogContent sx={{ mb: 1 }}>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              disablePortal
              id="career_select"
              options={selection_career_name}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                const careerPathId =
                  value?.career_path_id !== undefined &&
                  value?.career_path_id >= 0
                    ? value.career_path_id
                    : -1;
                setFormData({ ...formData, career_path_id: careerPathId });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="*会社名"
                  error={formError.career_path_id}
                />
              )}
            />
          </FormControl>

          <TextField
            margin="dense"
            id="notes"
            label="備考"
            type="text"
            fullWidth
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="application_format">*応募形式選択</InputLabel>
            <Select
              labelId="application_format"
              id="application_format"
              value={formData.application_format}
              onChange={handleSelectChange}
              inputProps={{ name: "application_format" }}
              label="*応募形式"
              error={formError.application_format}
            >
              <MenuItem value="自由応募">自由応募</MenuItem>
              <MenuItem value="推薦">推薦</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="送付日"
              value={submission_date}
              onChange={handleSubmissionDateChange}
              sx={{ mt: 1 }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="来学日"
              value={visit_date}
              onChange={handleVisitDateChange}
              sx={{ mt: 1 }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="開始日"
              value={start_date}
              onChange={handleStartDateChange}
              sx={{ mt: 1 }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="終了日"
              value={end_date}
              onChange={handleEndDateChange}
              sx={{ mt: 1 }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            戻る
          </Button>
          <Button onClick={handleSubmit} color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
