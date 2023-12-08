//求人票
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import JoblistPutFormDialog from "@/component/big/joblist_put_dialog";
import { formatDate } from "@/utils/date_utils";
import { TextField, Box } from "@mui/material";
import styled from "styled-components";

export type CareerPath = {
  career_path_id: number;
  name: string;
  furigana: string;
  website?: string | null; // オプションのプロパティ
};

export type Joblist = {
  application_format: string;
  career_path: CareerPath; //JSON型の扱い型分からないので、any
  career_path_id: number;
  end_date: Date;
  job_listing_id: number;
  notes: string;
  start_date: Date;
  submission_date: Date;
  updated_at: Date;
  visit_date: Date;
};

export default function Joblists(props: {
  showCheckbox: boolean;
  showEditDeleteButtons: boolean;
}) {
  // 求人票のデータを管理する変数・関数
  const [joblists, setJoblists] = useState<Joblist[]>([]);

  // 求人票を表示する
  useEffect(() => {
    // 求人票をDBから取ってくる
    const fetchJoblists = async () => {
      try {
        const response = await fetch("api/joblist", {
          method: "GET",
        });
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          setJoblists(data);
        }
      } catch (error) {
        console.error("Error while loading data: ", error);
      }
    };
    fetchJoblists();
    // ＠＠未実装求人票が1つも無かったらその旨を通知する
  }, []);

  // 求人票を削除する
  const handleDelete = async (id: number) => {
    // 削除してよいか確認する

    // 求人票をDBから削除する
    try {
      const response = await fetch(`/api/joblist`, {
        method: "DELETE",
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({ job_listing_id: id }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error(
          "求人票の削除中にエラーが発生しました。HTTPステータスコード : ",
          response.status,
        );
      }
    } catch (error) {
      console.error(
        "求人票の削除中にエラーが発生しました。HTTPステータスコード : ",
        error,
      );
    }
  };

  // Nested Listが展開されているかどうか
  const [open, setOpen] = useState<{ [id: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen({
      ...open,
      [id]: !open[id],
    });
  };

  // チェックボックスの動作
  const [selectedJoblists, setSelectedJoblists] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    const index = selectedJoblists.indexOf(id);
    // 求人票が選択されていなければ
    if (index === -1) {
      const updatedSelectedJoblists = [...selectedJoblists, id];
      setSelectedJoblists(updatedSelectedJoblists);
      setOpen({
        ...open,
        [id]: false,
      });
    } else {
      // 求人票が選択されていれば
      const updatedSelectedJoblists = selectedJoblists.filter(
        (joblistId) => joblistId !== id,
      );
      setSelectedJoblists(updatedSelectedJoblists);
      setOpen({
        ...open,
        [id]: false,
      });
    }
  };

  // 会社名でフィルタリングする
  const [searchCompany, setSearchCompany] = useState<string>(""); //会社名の検索文字列
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCompany(e.target.value);
  };
  const filterJoblistsByCompany = (companyName: string) => {
    // joblistsの各要素に対して、career_pathプロパティが存在する　かつ　career_pathのnameプロパティが、companyNameに指定された文字列を含むjoblistを返す
    return joblists.filter(
      (joblist) =>
        joblist.career_path &&
        joblist.career_path.name
          .toLowerCase()
          .includes(companyName.toLowerCase()),
    );
  };
  // searchCompany(検索の入力)があるなら、filter関数でjoblistsをフィルタリングしfilterdjoblistとする。
  // ないなら条件指定なしとして全てのjoblistをfilterdjoblistととする
  const filteredJoblists = searchCompany
    ? filterJoblistsByCompany(searchCompany)
    : joblists;

  const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    /* 画面全体の背景色を白に変更 */
    height: 100vh; /* 画面の高さいっぱいに広がるように */
    margin: 0; /* マージンを0に設定 */
  `;

  const StyledList = styled(List)`
    width: 60%;
    margin-bottom: 12px;
    margin-right: auto;
    margin-left: auto;
    background: #f5f5dc;
    @media screen and (max-width: 600px) {
      width: 80%; /* 가로 폭이 600px 이하일 때 스타일 변경 */
    }
  `;

  const StyledTextfild = styled(TextField)`
    width: 246px;
    margin-bottom: 12px;
    margin-right: auto;
    margin-left: auto;
  `;

  // 表示する内容
  return (
    <StyledContainer>
      <Box sx={{ margin: 2 }}>
        <StyledTextfild
          label="会社名で検索"
          value={searchCompany}
          onChange={handleSearch}
        />
      </Box>
      {/* 掲載期間内の求人票をNested Listに表示する(掲載期間内かどうかはapiで判断) */}
      {filteredJoblists.map((joblist) => (
        <StyledList key={joblist.job_listing_id} component="nav">
          {/* 外側のリスト */}
          <ListItemButton onClick={() => handleClick(joblist.job_listing_id)}>
            {/* チェックボックスありなら */}
            {props.showCheckbox && (
              <Checkbox
                checked={selectedJoblists.includes(joblist.job_listing_id)}
                onChange={() => handleCheckboxChange(joblist.job_listing_id)}
                inputProps={{ "aria-label": "controlled" }} //要らなそう?
              />
            )}
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={joblist.career_path["name"]} />{" "}
            {/* 進路候補の名前 */}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* 内側のリスト */}
          <Collapse
            in={open[joblist.job_listing_id]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {[
                "備考：" + joblist.notes, // 備考
                "応募形式：" + joblist.application_format,
                "更新日時：" + formatDate(joblist.updated_at),
                "送付日：" + formatDate(joblist.submission_date),
                "来学日：" + formatDate(joblist.visit_date),
              ].map((star, index) => (
                <ListItem key={index} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={star} />
                </ListItem>
              ))}
            </List>

            {/* Edit and delete buttons */}
            {props.showEditDeleteButtons && (
              <ListItem sx={{ pl: 4 }}>
                <JoblistPutFormDialog
                  application_format={joblist.application_format}
                  career_path={joblist.career_path}
                  career_path_id={joblist.career_path_id}
                  end_date={joblist.end_date}
                  job_listing_id={joblist.job_listing_id}
                  notes={joblist.notes}
                  start_date={joblist.start_date}
                  submission_date={joblist.submission_date}
                  updated_at={joblist.updated_at}
                  visit_date={joblist.visit_date}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(joblist.job_listing_id)}
                  startIcon={<DeleteIcon />}
                  style={{
                    background: "#FFF",
                    width: "101px",
                  }}
                >
                  削除
                </Button>
              </ListItem>
            )}
          </Collapse>
        </StyledList>
      ))}
    </StyledContainer>
  );
}
