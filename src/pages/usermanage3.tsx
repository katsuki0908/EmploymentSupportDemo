import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useSession } from "next-auth/react"

interface Student {
  student_id: number;
  gender: string;
  affiliation: string;
  graduation_year: number;
  face_photo: string;
  updated_at: string;
  course_id: string;
  personal_address: string;
  personal_phone: string;
  personal_email: string;
  emergency_address: string;
  emergency_phone: string;
  //name: string; // 追加
}


const UserManage: React.FC = () => {
  const { data: graduationYear } = useSession();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [graduationYears, setGraduationYears] = useState<string[]>(generateGraduationYears());
  const [course, setCourse] = useState<string>('');
  const [displayedUsers, setDisplayedStudents] = useState<Student[]>([]);
  const [manage, setManages] = useState<Student[]>([]);
  const graduationYearsOptions = generateGraduationYears();

  useEffect(() => {
    fetchStudents();
  }, []); 

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/user");
      
      if (response.ok) {
        const studentsData: Student[] = await response.json();
        
        setStudents(studentsData);
        setSearchResult(studentsData);
        setDisplayedStudents(studentsData);
      } else {
        throw new Error('データの取得に失敗しました');
      }
    } catch (error) {
      console.error('データの取得エラー:', error);
    }
  };

  const handleSearch = () => {
    try {
      const filteredUsers = students.filter((student) => (
        (course === '' || student.course_id === course) &&
        (graduationYears.length === 0 || graduationYears.includes(student.graduation_year.toString()))
      ));
      setDisplayedStudents(filteredUsers);
    } catch (error) {
      console.error('ユーザーデータの取得エラー:', error);
    }
  };
  

  const handleSelectAll = () => {
    setSelectedStudents([...searchResult]);
  };

  const handleDeselectAll = () => {
    setSelectedStudents([]);
  };

  function generateGraduationYears() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => (currentYear - index + 2).toString());
    return years;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">ユーザー管理ページ</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        {/* 卒業年度の選択 */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="graduation_year">卒業年度</InputLabel>
          <Select
            value={graduationYears}
            onChange={(e) => setGraduationYears(e.target.value as string[])}
            label="卒業年度"
          >
            <MenuItem value="">すべて</MenuItem>
            {graduationYearsOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {`${year}年`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* コースの選択 */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="course_id">コース</InputLabel>
          <Select
            value={course}
            onChange={(e) => setCourse(e.target.value as string)}
            label="コース"
          >
            <MenuItem value="A">すべて</MenuItem>
            <MenuItem value="B">情報システムコース</MenuItem>
            <MenuItem value="C">情報コース</MenuItem>
            <MenuItem value="D">電気電子コース</MenuItem>
          </Select>
        </FormControl>

        {/* 検索バー}
        <TextField
          label="ユーザー検索"
          variant="outlined"
          fullWidth
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{ mb: 2 }}
          />*/}
        {/* 検索ボタン */}
        <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
          検索
        </Button>

        {/* ユーザー情報表示エリア */}
        <Typography variant="h5">ユーザー情報:</Typography>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>性別</th>
            <th>所属</th>
            <th>卒業年度</th>
            <th>顔写真</th>
            <th>更新日</th>
            <th>コース</th>
            <th>住所</th>
            <th>電話番号</th>
            <th>メール</th>
            <th>緊急連絡先住所</th>
            <th>緊急連絡先電話</th>
            {/*<th>名前</th>*/}
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((student) => (
            <tr key={student.student_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{student.student_id}</td>
              <td>{student.gender}</td>
              <td>{student.affiliation}</td>
              {/* 名前をリンクに変更 */}
              {/* マイページへのリンク処理を追加 */}
              {/*<td
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => {
                  // マイページへのリンク処理
                  console.log(`マイページへのリンク: /user/${student.student_id}`);
                  // ここに実際のリンク処理を追加する
                }}
              >
                {user.email}
              </td>*/}
              <td>{student.graduation_year}</td>
              <td>{student.face_photo}</td>
              <td>{student.updated_at}</td>
              <td>{student.course_id}</td>
              <td>{student.personal_address}</td>
              <td>{student.personal_phone}</td>
              <td>{student.personal_email}</td>
              <td>{student.emergency_address}</td>
              <td>{student.emergency_phone}</td>
              {/*<td>{student.name}</td>*/}
            </tr>
          ))}
        </tbody>
      </table>

        {/* ボタンエリア */}
        <Button variant="contained" onClick={handleSelectAll} sx={{ mr: 2, mb: 2 }}>
          全選択
        </Button>
        <Button variant="contained" onClick={handleDeselectAll} sx={{ mr: 2, mb: 2 }}>
          選択解除
        </Button>
        {/*<Button variant="contained" onClick={handleExport} sx={{ mb: 2 }}>
          選択したユーザーを出力
        </Button>*/}
      </Container>
    </React.Fragment>
  );
};

export default UserManage;
