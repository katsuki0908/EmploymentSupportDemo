import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import PageChangeButton from '../Atoms/page_change_button';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ErrorSnackbarProps {
  errorMessage: string;
  open: boolean;
  handleClose: () => void;
  router_path_name?:string;
}
const vertical = 'top'
const horizontal = 'center'

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  errorMessage,
  open,
  handleClose,
  router_path_name
}) => {
  return (
    <Snackbar open={open} autoHideDuration={null} onClose={handleClose}  anchorOrigin={{ vertical, horizontal}} sx={{width:'100%'}} >
      <div>
      <Alert onClose={handleClose} severity="error"  sx={{width: '100%'}}>
        {errorMessage}
        <PageChangeButton router_path_name={router_path_name}/>
      </Alert>
      </div>
    </Snackbar>
  );
};

export default ErrorSnackbar;
