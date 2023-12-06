import CareerPathAddFormDialog from "@/component/Molecules/career_path_add_form_dialog";
import CareerActionAddFormDialog from "@/component/Molecules/career_action_add_form";
import { Box, Divider } from "@mui/material";
import Header from "@/component/big/header";
import { useSession } from "next-auth/react";
import GoToLogInPage from "@/component/Templates/go_to_login_page";
import CsvUploader from "@/component/Molecules/csv_uploder";

export default function Config () {
    const {data:session} = useSession();

    const handleFileUpload = (file:File) => {
      const formData = new FormData();
      formData.append('file', file);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    if (session?.user.user_type !== 'admin') {
        return (
          <GoToLogInPage/>
        );
      }

    return(
        <>
        <Box
        sx={{height:'100vh',backgroundColor:'secondary.main'}}
        >
        <Header/>
        <CareerPathAddFormDialog/>
        <Divider/>
        <CareerActionAddFormDialog/>
        <CsvUploader onFileUpload={handleFileUpload}/>
        </Box>
        </>
    )
}