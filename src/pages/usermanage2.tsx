// src/usermanage.tsx

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
import Header from '@/component/big/manageheader'

/*interface User {
  id: number;
  name: string;
  email: string;
  graduationYear: number; // 卒業年度の追加
  course: string; // コースの追加
  // Add any other properties as needed
}*/

interface Student {
    // 学生のデータ構造をここで定義する
    student_id: number;
    name: string;
    graduation_year: number;
    course_id: string;
    // 他のプロパティを必要に応じて追加
  }

/*const dummyUserData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', graduationYear: 2023, course: '情報システムコース' },
  { id: 2, name: 'Bob', email: 'bob@example.com', graduationYear: 2022, course: '情報コース' },
  { id: 3, name: 'jon', email: 'jon@example.com', graduationYear: 2021, course: '電気電子コース' },
  { id: 4, name: 'あびる', email: 'abiru@example.com', graduationYear: 2022, course: '情報システムコース' },
  { id: 5, name: '阿比留', email: 'abiru@example.com', graduationYear: 2021, course: '情報システムコース' },
  // 必要なだけダミーデータを追加
];*/

const UserManage: React.FC = () => {
  const {data:graduationYear} = useSession();//セッション情報取得
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  //const [searchResult, setSearchResult] = useState<User[]>([]);
  //const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  //const [selectedUsers, setSelectedUsers] = useState<User[]>(dummyUserData);
  const [searchResult, setSearchResult] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [graduationYears, setGraduationYears] = useState<string[]>(generateGraduationYears());
  const [course, setCourse] = useState<string>('');
  //const [displayedUsers, setDisplayedUsers] = useState<User[]>(dummyUserData);
  const [displayedUsers, setDisplayedStudents] = useState<Student[]>([]);
  

  /*const handleSearch = async () => {
    try {
      const response = await fetch(`/api/users/${searchKeyword}?graduationYear=${graduationYears}&course=${course}`);
      const data: User[] = await response.json();
      setSearchResult(data);
      setSelectedUsers(data);
    } catch (error) {
      console.error('ユーザーデータの取得エラー:', error);
    }
  };*/

  const graduationYearsOptions = generateGraduationYears();

  

  const handleSearch = () => {
  try {
    const filteredUsers = students.filter((student) => (
      student.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
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

  /*const handleExport = async () => {
    try {
      const selectedUserIds = selectedStudents.map((student) => student.student_id);
      const response = await fetch('/api/export-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedUserIds }),
      });
      const blob = await response.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'selected_users.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Excelのエクスポートエラー:', error);
    }
  };*/

  const handleToggleSelect = (student: Student) => {
    if (selectedStudents.some((selectedStudent) => selectedStudent.student_id === student.student_id)) {
      setSelectedStudents(selectedStudents.filter((selectedStudent) => selectedStudent.student_id !== student.student_id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [graduationYears, course]);

  useEffect(() => {
    // ページがロードされた時にデータを取得する
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      //const graduationYear = 2023; // 例として2023年を設定
      //const courseID = 1; // 例としてコースID 1 を設定

      //const response = await fetch(`/api/your-endpoint-here?graduation_year=${graduationYears}&course_id=${course}`);
      //const response = await fetch('/api/user?graduation_year=${graduationYears}&course_id=${course}', {method: 'GET',});
      const response = await fetch("/api/user?graduation_year" + graduationYears, {method: 'GET',});
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }

      const graduationYear: Student[] = await response.json();

      setStudents(graduationYear);
      setSearchResult(graduationYear); // データ取得後、検索結果を更新
      setDisplayedStudents(graduationYear);

    } catch (error) {
      console.error('データの取得エラー:', error);
    }
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
            <th>名前</th>
            <th>卒業年度</th>
            <th>コース</th>
            <th>指導教員</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((student) => (
            <tr key={student.student_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
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
              <td>{student.course_id}</td>
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