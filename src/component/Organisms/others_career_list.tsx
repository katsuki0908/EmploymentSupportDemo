import * as React from "react";
import {
  career_action_table as BaseCareerAction,
  action_table,
  career_path_table,
} from "@prisma/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Divider,
  // Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CareerPutFormDialog from "../big/career_put_dialog";
import { formatDate } from "@/utils/date_utils"; //自作関数
import { FormDialogProps } from "@/types/props";
import CareerNameChangeFormDialog from "../Molecules/career_name_change_form_dialog";

type ExtendedCareerAction = BaseCareerAction & {
  action?: action_table;
  career_path?: career_path_table;
};

export default function OthersCareerlist(props: FormDialogProps) {
  const [career, setCareer] = React.useState<ExtendedCareerAction[]>([]);
  const [openAccordions, setOpenAccordions] = React.useState<number[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/others", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setCareer(data);
        } else {
          console.error(
            "Error while loading career data: HTTP status ",
            response.status,
          );
        }
      } catch (error) {
        console.error("Error while loading career data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleAccordionClick = (careerActionId: number) => {
    setOpenAccordions((prev) => {
      if (prev.includes(careerActionId)) {
        return prev.filter((id) => id !== careerActionId);
      } else {
        return [...prev, careerActionId];
      }
    });
  };

  // const handleDelete = async (careerActionId: number) => {
  //   //削除処理
  //   try {
  //     const response = await fetch(`/api/career`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ career_action_id: careerActionId }),
  //     });

  //     if (response.ok) {
  //       // Remove the deleted career item from the state
  //       setCareer((prevCareer) =>
  //         prevCareer.filter(
  //           (careerItem) => careerItem.career_action_id !== careerActionId,
  //         ),
  //       );
  //     } else {
  //       console.error(
  //         "Error while deleting career data: HTTP status ",
  //         response.status,
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error while deleting career data: ", error);
  //   }
  // };

  const CustomAccordion = styled(Accordion)({
    border: "1px solid #000000",
    borderRadius: "4px",
    "&:not(:last-child)": {
      borderBottom: 2,
    },
  });

  if (career.length === 0) {
    return <Box>データがありません</Box>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* キャリア活動表示*/}
      {career.map((career_item) => (
        <CustomAccordion
          key={career_item.career_action_id}
          expanded={openAccordions.includes(career_item.career_action_id)}
          onChange={() => handleAccordionClick(career_item.career_action_id)}
          sx={{ mb: 1, width: "100vw" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ overflowX: "auto" }}>
              {" "}
              {/* 横スクロール可能なコンテナを追加 */}
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                {career_item.career_path?.name}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "black" }}
                />
                {career_item.action?.name}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "black" }}
                />
                {formatDate(career_item.action_date)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid xs={12}>
                <Typography>学籍番号</Typography>
                <Divider sx={{ backgroundColor: "black" }} />
              </Grid>
              <Grid xs={4}>
                <Typography>{career_item.student_id}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography>備考</Typography>
                <Divider sx={{ backgroundColor: "black" }} />
              </Grid>
              <Grid xs={12}>
                <Typography>{career_item.notes}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography>website</Typography>
                <Divider sx={{ backgroundColor: "black" }} />
              </Grid>
              <Grid xs={12}>
                <Typography>{career_item.career_path?.website}</Typography>
              </Grid>
              <Grid xs={4}>
                {/* 編集用ダイアログ*/}
                <CareerPutFormDialog
                  initialData={{
                    student_id: career_item.student_id,
                    career_action_id: career_item.career_action_id,
                    selection_action: career_item.action?.name,
                    notes: career_item.notes,
                    company_name: career_item.career_path?.name,
                    action_date: career_item.action_date,
                    action_id: career_item.action_id,
                    career_path_id: career_item.career_path_id,
                  }}
                  action_data={props.action_data}
                  career_path_data={props.career_path_data}
                />
              </Grid>
              <Grid xs={8}>
                {/* 編集用ダイアログ*/}
                <CareerNameChangeFormDialog
                  initialData={{
                    career_action_id: career_item.career_action_id,
                    notes: career_item.notes,
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </CustomAccordion>
      ))}
    </Box>
  );
}
