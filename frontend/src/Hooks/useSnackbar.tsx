import React, { useState } from "react";
import MuiAlert, { AlertProps }  from '@material-ui/lab/Alert';
import {
    Snackbar,  
    FormHelperText
  } from '@material-ui/core';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

interface CustomSnackbarProps {
    open: boolean;
    severity: "error" | "success";
    message: string;
    handleClose: () => void;
    autoHideDuration: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    message,
    severity,
    open,
    handleClose,
    autoHideDuration,
}) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} data-testid='li-snack'>
            <Alert onClose={handleClose} severity={severity}>
              {message && <FormHelperText >{message}</FormHelperText>}
            </Alert>
        </Snackbar>
    );
};

const useSnackbar = (): [JSX.Element, (value: React.SetStateAction<string>) => void, (value: React.SetStateAction<"error" | "success">) => void] => {
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState<"error" | "success">("success");
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setMsg('');
    };
    const snackBarData = {
        message: msg,
        severity,
        open: !!msg,
        handleClose,
        autoHideDuration: 3000
    }
    return [<CustomSnackbar {...snackBarData} />, setMsg, setSeverity];
};

export default useSnackbar;

