import * as React from 'react';
import { useRouter } from 'next/router';
import { career_action_table as BaseCareerAction, action_table, career_path_table } from "@prisma/client";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Divider, Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CareerPutFormDialog from './career_put_dialog';//自作コンポーネント
import { formatDate } from '@/utils/date_utils';//自作関数
import { FormDialogProps } from '@/types/props';
import { ConfirmDialog } from '../mid/confirm_dialog';

type ExtendedCareerAction = BaseCareerAction & {
  action?: action_table;
  career_path?: career_path_table;
};

export default function Careerlist(props: FormDialogProps) {
  const [career, setCareer] = React.useState<ExtendedCareerAction[]>([]);
  const [openAccordions, setOpenAccordions] = React.useState<number[]>([]);
  const router = useRouter();
  const [confirm_dialog, setConfirm_dialog] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/career?student_id=" + props.initialData.student_id, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setCareer(data);
        } else {
          console.error("Error while loading career data: HTTP status ", response.status);
        }
      } catch (error) {
        console.error("Error while loading career data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleConfirmDialogOpen = () => {
    setConfirm_dialog(true);
  }

  const handleConfirmDialogClose = () => {
    setConfirm_dialog(false);
  }

  const handleAccordionClick = (careerActionId: number) => {
    setOpenAccordions(prev => {
      if (prev.includes(careerActionId)) {
        return prev.filter(id => id !== careerActionId);
      } else {
        return [...prev, careerActionId];
      }
    });
  };

  const handleDelete = async (careerActionId: number) => {//削除処理
    try {
      const response = await fetch(`/api/career`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ career_action_id: careerActionId })
      });

      if (response.ok) {
        // Remove the deleted career item from the state
        setCareer(prevCareer => prevCareer.filter(careerItem => careerItem.career_action_id !== careerActionId));
      } else {
        console.error("Error while deleting career data: HTTP status ", response.status);
      }
    } catch (error) {
      console.error("Error while deleting career data: ", error);
    }
  };

  const CustomAccordion = styled(Accordion)({
    border: '1px solid #000000',
    borderRadius: '4px',
    '&:not(:last-child)': {
      borderBottom: 2,
    }
  });

  if (career.length === 0) {
    return (
      <Box>
        データがありません
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* キャリア活動表示*/}
      {career.map((career_item) => (
        <CustomAccordion
          key={career_item.career_action_id}
          expanded={openAccordions.includes(career_item.career_action_id)}
          onChange={() => handleAccordionClick(career_item.career_action_id)}
          sx={{ mb: 1, width: '100vw' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ overflowX: 'auto' }}> {/* 横スクロール可能なコンテナを追加 */}
              <Typography style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                {career_item.career_path?.name}
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'black' }} />
                {career_item.action?.name}
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'black' }} />
                {formatDate(career_item.action_date)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid xs={12}>
                <Typography>
                  備考
                </Typography>
                <Divider sx={{ backgroundColor: 'black' }} />
              </Grid>
              <Grid xs={12}>
                <Typography>
                  {career_item.notes}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography>
                  website
                </Typography>
                <Divider sx={{ backgroundColor: 'black' }} />

              </Grid>
              <Grid xs={12}>
                <Typography>
                  {career_item.career_path?.website}
                </Typography>
              </Grid>

              {(props.initialData.student_id == 'admin' || router.pathname == '/edit_career') && (//編集ページでのみ表示
                <Grid xs={4}>
                  {/* 編集用ダイアログ*/}
                  <CareerPutFormDialog initialData={{
                    student_id: props.initialData.student_id,
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
              )}
              {(props.initialData.student_id == 'admin' || router.pathname == '/edit_career') && (//編集ページでのみ表示
                <Grid xs={4}>
                  {/* 削除ボタン*/}
                  <Button
                    onClick={() => handleConfirmDialogOpen()}
                    color="error"
                    variant='contained'
                    endIcon={<DeleteIcon />}
                  >
                    削除
                  </Button>
                  <ConfirmDialog
                    open={confirm_dialog}
                    onConfirm={() => handleDelete(career_item.career_action_id)} // ここを修正
                    onCancel={handleConfirmDialogClose}
                    title="確認"
                    message="本当に削除しますか？"
                  />
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </CustomAccordion>
      ))}
    </Box>

  );
}
