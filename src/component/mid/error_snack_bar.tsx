import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import PageChangeButton from "../Atoms/page_change_button";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ErrorSnackbarProps {
  errorMessage: string;
  open: boolean;
  handleClose: () => void;
  router_path_name?: string;
  buttonMessage?: string;
  button_flag: boolean;
}
const vertical = "top";
const horizontal = "center";

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  errorMessage,
  open,
  handleClose,
  router_path_name,
  button_flag,
  buttonMessage,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={null}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      sx={{ width: "100%" }}
    >
      <div>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
          {button_flag && (
            <PageChangeButton
              router_path_name={router_path_name}
              button_message={buttonMessage}
            />
          )}
        </Alert>
      </div>
    </Snackbar>
  );
};

export default ErrorSnackbar;
