import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import GraduationYearSelector from "@/component/mid/GraduationYearSelector"; // 追加: 新しいコンポーネントのimport
import Header from "@/component/big/header";

interface Name {
  name: string;
}

interface Student {
  student_id: number;
  gender: string;
  affiliation: string;
  graduation_year: number;
  cource_id: number;
  updated_at: string;
  course_id: string;
  user: Name; // 追加
}

const UserManage: React.FC = () => {
  // const { data: graduationYear } = useSession();
  // const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Student[]>([]);
  const [, setSelectedStudents] = useState<Student[]>([]);
  const [, setStudents] = useState<Student[]>([]);
  const [, setGraduationYears] = useState<string[]>(
    generateGraduationYears(),
  );
  const [cource, setCource] = useState<string>("");
  const [displayedUsers, setDisplayedStudents] = useState<Student[]>([]);
  // const [manage, setManages] = useState<Student[]>([]);
  // const graduationYearsOptions = generateGraduationYears();
  const [selectedYear, setSelectedYear] = useState<string>(""); // 選択された年
  const router = useRouter();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const courseQuery = cource ? `&cource_id=${cource}` : ""; // コースが選択されている場合のクエリ
      const response = await fetch(
        `/api/user?graduation_year=${selectedYear}${courseQuery}`,
        {
          method: "GET",
        },
      );
      if (response.ok) {
        const studentsData: Student[] = await response.json();
        //const object = JSON.parse(studentsData[0].user)
        //console.log(studentsData[0]['user']['name']);
        console.log(studentsData[0].user["name"]);
        setStudents(studentsData);
        setSearchResult(studentsData);
        setDisplayedStudents(studentsData);
      } else {
        throw new Error("データの取得に失敗しました");
      }
    } catch (error) {
      console.error("データの取得エラー:", error);
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
    const years = Array.from({ length: 10 }, (_, index) =>
      (currentYear - index + 2).toString(),
    );
    return years;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        {/* 卒業年度の選択 */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <GraduationYearSelector
            setGraduationYears={setGraduationYears}
            setSelectedYear={setSelectedYear} // 選択された年を受け取るコールバック
          />
        </FormControl>

        {/* コースの選択 */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="cource_id">コース</InputLabel>
          <Select
            value={cource}
            onChange={(e) => setCource(e.target.value as string)}
            label="コース"
            id="cource_id"
          >
            <MenuItem value=" ">すべて</MenuItem>
            <MenuItem value="1">情報システムコース</MenuItem>
            <MenuItem value="2">情報コース</MenuItem>
            <MenuItem value="3">電気電子コース</MenuItem>
          </Select>
        </FormControl>

        {/* 検索ボタン */}
        <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
          検索
        </Button>

        {/* ユーザー情報表示エリア */}
        <Typography variant="h5">ユーザー情報:</Typography>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "16px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>性別</th>
              <th>所属</th>
              <th>卒業年度</th>
              <th>コース</th>
              <th>更新日</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((student) => (
              <tr
                key={student.student_id}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <td>
                  <div
                    style={{
                      textDecoration: "underline",
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      router.push(`/usermanage/${student.student_id}/mypage`)
                    }
                  >
                    {student.student_id}
                  </div>
                </td>
                <td>{student.user.name}</td>
                <td>{student.gender}</td>
                <td>{student.affiliation}</td>
                <td>{student.graduation_year}</td>
                <td>{student.cource_id}</td>
                <td>{student.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ボタンエリア */}
        <Button
          variant="contained"
          onClick={handleSelectAll}
          sx={{ mr: 2, mb: 2 }}
        >
          全選択
        </Button>
        <Button
          variant="contained"
          onClick={handleDeselectAll}
          sx={{ mr: 2, mb: 2 }}
        >
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
