// 教員用プロフィール編集(一旦保留)
import { Stack, Collapse, TextField, Button } from '@mui/material';
import { useState } from "react";
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Select, MenuItem, InputLabel, SelectChangeEvent, Box } from '@mui/material';

export const ProfileTextField = ({ editing }: any) => {
    // 引数の型指定どうしたらええねん　tsx記法むず過ぎかもです;;
    const [profile_data, setProfileData] = useState({
        test: "",
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
    });
    //-----------仮設置(性別、所属、学年、卒業年度、備考)-----------
    const [affiliation, setAffiliation] = useState('');
    const [grade, setGrade] = useState('');
    const [graduation_year, setGraduation_year] = useState('');
    const handleChange1 = (event: SelectChangeEvent) => {
        setAffiliation(event.target.value as string);
    };
    const handleChange2 = (event: SelectChangeEvent) => {
        setGrade(event.target.value as string);
    };
    const handleChange3 = (event: SelectChangeEvent) => {
        setGraduation_year(event.target.value as string);
    };
    //-----------仮設置(性別、所属、学年、卒業年度、備考)-----------

    // 保存機能もこのコンポーネントにいれちゃうか　どうせ保存ボタン自体ないと親元におくらないしな
    return (
        <div>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row">
                    <TextField label="test" value={profile_data.test} onChange={e => setProfileData({ ...profile_data, test: e.target.value })} disabled={!editing} required />
                    {/* <TextField label="名" value={last_name} onChange={e => setLastName(e.target.value)} InputProps={{readOnly:editing}} required/> */}
                </Stack>
                <Stack spacing={1} direction="row">
                    <TextField label="姓" value={profile_data.first_name} onChange={e => setProfileData({ ...profile_data, first_name: e.target.value })} disabled={!editing} required />
                    <TextField label="名" value={profile_data.last_name} onChange={e => setProfileData({ ...profile_data, last_name: e.target.value })} disabled={!editing} required />
                </Stack>
                <Stack spacing={1} direction="row">
                    <TextField label="セイ" value={profile_data.first_name_kana} onChange={e => setProfileData({ ...profile_data, first_name_kana: e.target.value })} disabled={!editing} required />
                    <TextField label="メイ" value={profile_data.last_name_kana} onChange={e => setProfileData({ ...profile_data, last_name_kana: e.target.value })} disabled={!editing} required />
                </Stack>
                <Stack spacing={3} direction="row">
                    <Collapse in={editing}>
                        <Button onClick={() => console.log(profile_data)} type="submit" variant="contained">保存</Button>
                    </Collapse>
                </Stack>

                {/* -----------仮設置(性別、所属、学年、卒業年度、備考)----------- */}
                <Stack spacing={3} direction="row">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">性別</FormLabel>
                        <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                            <FormControlLabel value="男" control={<Radio />} label="男" />
                            <FormControlLabel value="女" control={<Radio />} label="女" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
                <Stack spacing={3} direction="row">
                    <FormControl sx={{ m: 2, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">所属</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={affiliation} onChange={handleChange1} label="所属">
                            <MenuItem value={"学士"}>学士</MenuItem>
                            <MenuItem value={"修士"}>修士(博士課程前期)</MenuItem>
                            <MenuItem value={"博士"}>博士(博士課程後期)</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={3} direction="row">
                    <FormControl sx={{ m: 2, minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">学年</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={grade} onChange={handleChange2} label="学年">
                            <MenuItem value={1}>1年</MenuItem>
                            <MenuItem value={2}>2年</MenuItem>
                            <MenuItem value={3}>3年</MenuItem>
                            <MenuItem value={4}>4年</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={3} direction="row">
                    <FormControl sx={{ m: 2, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-label">卒業年度(予定)</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={graduation_year} onChange={handleChange3} label="卒業予定(予定)">
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2025}>2025</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={3} direction="row">
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' }, }} noValidate autoComplete="off">
                        <TextField id="outlined-multiline-static" label="備考" multiline rows={4} />
                    </Box>
                </Stack>
                {/* -----------仮設置(性別、所属、学年、卒業年度、備考)----------- */}
                <Stack spacing={3} direction="row">
                </Stack>
            </Stack>
        </div>
    )
}