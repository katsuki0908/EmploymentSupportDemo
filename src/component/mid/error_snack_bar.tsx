import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ErrorSnackbarProps {
  errorMessage: string;
  open: boolean;
  handleClose: () => void;
}
const vertical = 'top'
const horizontal = 'center'

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  errorMessage,
  open,
  handleClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical, horizontal}} sx={{width:'100%'}} >
      <div>
      <Alert onClose={handleClose} severity="error"  sx={{width: '100%'}}>
        {errorMessage}
      </Alert>
      </div>
    </Snackbar>
  );
};

export default ErrorSnackbar;
