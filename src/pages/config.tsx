import CareerPathAddFormDialog from "@/component/Molecules/career_path_add_form_dialog";
import CareerActionAddFormDialog from "@/component/Molecules/career_action_add_form";
import { Box, Divider } from "@mui/material";
import Header from "@/component/big/header";
// import { useSession } from "next-auth/react";
// import GoToLogInPage from "@/component/Templates/go_to_login_page";
import CsvUploader from "@/component/Molecules/csv_uploder";
// import DownloadSelectButton from "@/component/Molecules/download_select_button";

export default function Config() {
  return (
    <>
      <Box sx={{ height: "100vh", backgroundColor: "secondary.main" }}>
        <Header />
        <Box sx={{ mt: 10 }}>
          <CareerPathAddFormDialog />
          <Divider />
          <CareerActionAddFormDialog />
          <CsvUploader />
          {/* <DownloadSelectButton/> */}
        </Box>
      </Box>
    </>
  );
}
