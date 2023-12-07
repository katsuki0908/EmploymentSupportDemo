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
  Autocomplete,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EditIcon from "@mui/icons-material/Edit";
import { Joblist } from "@/component/big/joblist";
import { career_path_table } from "@prisma/client";

export default function JoblistPutFormDialog(props: Joblist) {
  // DBに登録された会社名を取得する
  const [selection_career_data, setSelection_career_data] = useState<
    career_path_table[]
  >([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const career_name = await fetch("/api/career_path", {
          method: "GET",
        });
        if (career_name.ok) {
          const career_data = await career_name.json();
          setSelection_career_data(career_data);
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
    application_format: props.application_format || "",
    career_path_id: props.career_path_id || -1,
    notes: props.notes || "",
  });

  // 送付日の設定
  const [submission_date, setSubmissionDate] = useState<Date | null>(
    props.submission_date ? new Date(props.submission_date) : null,
  );
  // 来学日の設定
  const [visit_date, setVisitDate] = useState<Date | null>(
    props.visit_date ? new Date(props.visit_date) : null,
  );
  // 開始日の設定
  const [start_date, setStartDate] = useState<Date | null>(
    props.start_date ? new Date(props.start_date) : null,
  );
  // 終了日の設定
  const [end_date, setEndDate] = useState<Date | null>(
    props.end_date ? new Date(props.end_date) : null,
  );
  // ダイアログが開閉フラグ
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
    //ダイアログを開く
    setOpen(true);
  };
  const handleClose = () => {
    //ダイアログを閉じる
    setOpen(false);
    resetFormError();
  };

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

    try {
      const response = await fetch("/api/joblist", {
        method: "PUT",
        body: JSON.stringify({
          job_listing_id: props.job_listing_id,
          application_format: formData.application_format,
          career_path_id: formData.career_path_id,
          notes: formData.notes,
          submission_date: submission_date,
          visit_date: visit_date,
          start_date: start_date,
          end_date: end_date,
        }),
      });
      console.log(response);
      if (response.ok) {
        window.location.reload();
      } else {
        console.error(
          "求人票の修正中にエラーが発生しました。HTTPステータスコード : ",
          response.status,
        );
        // console.log('レスポンスのテキスト:', await response.text());
      }
    } catch (error) {
      console.error(
        "求人票の修正中にエラーが発生しました。HTTPステータスコード : ",
        error,
      );
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

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<EditIcon />}
      >
        編集
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">求人票編集</DialogTitle>
        <DialogContent sx={{ mb: 1 }}>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              disablePortal
              id="career_select"
              options={selection_career_data}
              getOptionLabel={(option) => option.name}
              value={
                selection_career_data.find(
                  (option) => option.career_path_id === formData.career_path_id,
                ) || null
              } // 初期値の設定
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="*会社名"
                  error={formError.career_path_id}
                />
              )}
              onChange={(event, value) => {
                const careerPathId =
                  value?.career_path_id !== undefined &&
                  value?.career_path_id >= 0
                    ? value.career_path_id
                    : -1;
                setFormData({ ...formData, career_path_id: careerPathId });
              }}
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
            <InputLabel id="application_format">応募形式選択</InputLabel>
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
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
