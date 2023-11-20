import * as React from 'react';
import { useSession } from 'next-auth/react';
import { career_action_table as BaseCareerAction, action_table, career_path_table } from "@prisma/client";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Container, Divider, Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CareerPutFormDialog from './career_put_dialog';//自作コンポーネント
import { formatDate } from '@/utils/date_utils';//自作関数

type ExtendedCareerAction = BaseCareerAction & {
  action?: action_table;
  career_path?: career_path_table;
};

export default function Careerlist() {
  const [career, setCareer] = React.useState<ExtendedCareerAction[]>([]);
  const [openAccordions, setOpenAccordions] = React.useState<number[]>([]);
  const { data:session } = useSession();
 
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/career_database?student_id" + session?.user.user_id, {
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
  }, [session]);

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
      const response = await fetch(`/api/career_database`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
     },
     body: JSON.stringify({career_action_id: careerActionId})});
      
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
    }});

  if (career.length === 0 ) {
    return (
      <Box>
        <p>データがありません</p>
      </Box>
    );
  }

  return (
    <Container>
    <Box sx={{width:'100%'}}>
      {/* キャリア活動表示*/}
      {career.map((career_item) => (
         <CustomAccordion
         key={career_item.career_action_id}
         expanded={openAccordions.includes(career_item.career_action_id)}
         onChange={() => handleAccordionClick(career_item.career_action_id)}
         sx={{mb:1}}
       >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
           <Typography style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <span>{career_item.career_path?.name}</span>
              <Divider orientation="vertical" flexItem sx={{backgroundColor:'black'}} />
              <span>{career_item.action?.action_name}</span>
              <Divider orientation="vertical" flexItem sx={{backgroundColor:'black'}}/>
              <span>{formatDate(career_item.action_date)}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid xs={12}>
                <Typography>
                  備考
                </Typography>
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
              </Grid>
              <Grid xs={12}>
                <Typography>  
                  {career_item.career_path?.website}
                </Typography>
              </Grid>
            <Grid xs={4}>
              {/* 編集用ダイアログ*/}
              <CareerPutFormDialog initialData={{
                student_id:session?.user.user_id,
                career_action_id:career_item.career_action_id,
                selection_action:career_item.action?.action_name,
                notes:career_item.notes,
                company_name:career_item.career_path?.name,
                action_date:career_item.action_date,
                }}/>
            </Grid>
            <Grid xs={4}>
              {/* 削除ボタン*/}
              <Button 
              onClick={() => handleDelete(career_item.career_action_id)} 
              color="error"
              variant='contained'
              endIcon={<DeleteIcon />}
              >
                削除
              </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </CustomAccordion>
      ))}
    </Box>
    </Container>
  );}
