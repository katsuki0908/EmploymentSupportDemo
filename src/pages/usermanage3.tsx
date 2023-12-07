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
  Table,
} from '@mui/material';
import { useSession } from "next-auth/react"
import Head  from 'next/head';
import Header from '@/component/big/header';
import styled from "styled-components";

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
    <>
    <Head>
      <title>ユーザ管理ページ</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <React.Fragment>
      <CssBaseline />
      
      <Header />
      <StyledTypography>ユーザ管理</StyledTypography>
      <StyledContainer component="main">
        {/* 卒業年度の選択 */}
        <StyledFormControl fullWidth sx={{ mb: 2 }}>
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
        </StyledFormControl>

        {/* コースの選択 */}
        <StyledFormControl fullWidth sx={{ mb: 2 }}>
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
        </StyledFormControl>

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
        <StyledButton variant="contained" onClick={handleSearch}>
          検索
        </StyledButton>

        {/* ユーザー情報表示エリア */}
        <StyledTypography>ユーザー情報</StyledTypography>
          {/* ボタンエリア */}
          <StyledButtonContainer>
            <StyledButton variant="contained" onClick={handleSelectAll} style={{marginRight:'10px'}}>
              全選択
            </StyledButton>
            <StyledButton variant="contained" onClick={handleDeselectAll} >
              選択解除
            </StyledButton>
            {/*<StyledButton variant="contained" onClick={handleExport}>
              選択したユーザーを出力
            </StyledButton>*/}
          </StyledButtonContainer>
      <StyledTable>
        <thead 
          style={{background: '#9D2328', color: '#FFF'}}>
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
            <tr key={student.student_id} style={{ borderBottom: '1px solid #9D2328' }}>
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
      </StyledTable>

      </StyledContainer>
    </React.Fragment>
  </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  background: #FFF;
  /* 画面全体の背景色を白に変更 */
  height: 100vh; /* 画面の高さいっぱいに広がるように */
  margin: 0; /* マージンを0に設定 */
`;

const StyledFormControl = styled(FormControl)`
  width: 55%;
  margin-bottom: 12px;
  margin-right: auto;
  margin-left: auto;
  background: #FFF;

  @media screen and (max-width: 600px) {
    width: 80%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
  font-weight: 700;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 10px;
  @media screen and (max-width: 600px) {
    // width: 80%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  // font-size: 2em;
  width: 101px;
  hight: 33px;
  background: #FFF;
  color: #9D2328;
  margin: 10px auto;
  border: 1px #9D2328 solid;
  @media screen and (max-width: 600px) {
    
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Distribute buttons horizontally with space between them */
  margin-bottom: 12px;
  margin-right: auto;
  margin-left: auto;
  @media screen and (max-width: 600px) {
  }
`;

const StyledTable = styled(Table)`
  width: 900px;
  margin-right: auto;
  margin-left: auto;
`;

export default UserManage;
