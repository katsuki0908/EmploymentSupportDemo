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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormDialogProps } from "@/types/props";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Autocomplete } from "@mui/material";
import { career_path_table } from "@prisma/client";

export default function JoblistAddFormDialog() {
    const [selection_career_name, setSelection_career_name] = useState<career_path_table[]>([]);
    const [open, setOpen] = useState(false);
    const [submission_date, setSubmissionDate] = useState<Date | null>(null);
    const [visit_date, setVisitDate] = useState<Date | null>(null);
    const [start_date, setStartDate] = useState<Date | null>(null);
    const [end_date, setEndDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({
        application_format: "",
        submission_date: "",
        visit_date: "",
        career_path_id: -1,
        notes: "",
        start_date: "",
        end_date: ""
    });

    React.useEffect(() => {
        // 会社名・アクション選択肢の取得
        const fetchData = async () => {
            try {
                const career_name = await fetch("/api/career_path", {
                    method: 'GET',
                });
                if (career_name.ok) {
                    const career_data = await career_name.json();
                    setSelection_career_name(career_data);
                } else {
                    console.error("Error while loading career data: HTTP status ", career_name.status);
                }
            } catch (error) {
                console.error("Error while loading career data: ", error);
            }
        };
        fetchData();
    }, []);

    const handleClickOpen = () => {
        // ダイアログの開閉
        console.log(selection_career_name)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 求人票を追加する
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        // career_path_id が null の場合にエラーを処理する
        if (formData.career_path_id === -1) {
            console.error("求人票を追加する際に会社名を選択してください。");
            return; 
        }
        const response = await fetch('/api/joblist', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "application_format": formData.application_format,
                "submission_date": submission_date,
                "visit_date": visit_date,
                "career_path_id": formData.career_path_id,
                "notes": formData.notes,
                "start_date": start_date,
                "end_date": end_date
            })
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

    // 来学日
    const handleVisitChange = (date: Date | null): void => {
        setVisitDate(date);
    };

    // 送付日
    const handleDateChange = (date: Date | null): void => {
        setSubmissionDate(date);
    };

    // 掲載開始日
    const handleStartChange = (date: Date | null): void => {
        setStartDate(date);
    };

    // 掲載終了日
    const handleEndChange = (date: Date | null): void => {
        setEndDate(date);
    };

    return (
        <div>
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    endIcon={<AddCircleIcon />}
                    sx={{ margin: 1 }}
                >
                    追加
                </Button>
            </Container>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">求人票入力</DialogTitle>
                <DialogContent sx={{ mb: 1 }}>
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            disablePortal
                            id="career_select"
                            options={selection_career_name}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="会社名" />}
                            onChange={(event, value) => setFormData({ ...formData, career_path_id: value?.career_path_id || -1})}
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
                            inputProps={{ name: 'application_format' }}
                            label="応募形式"
                        >
                            <MenuItem value="自由応募">自由応募</MenuItem>
                            <MenuItem value="推薦">推薦</MenuItem>
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="送付日"
                            value={submission_date}
                            onChange={handleDateChange}
                            sx={{ mt: 1 }}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="来学日"
                            value={visit_date}
                            onChange={handleVisitChange}
                            sx={{ mt: 1 }}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="開始日"
                            value={start_date}
                            onChange={handleStartChange}
                            sx={{ mt: 1 }}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="終了日"
                            value={end_date}
                            onChange={handleEndChange}
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