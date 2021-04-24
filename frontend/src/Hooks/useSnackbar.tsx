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
    openError: boolean;
    error: string;
    handleCloseError: () => void;
    autoHideDuration: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    error,
    openError,
    handleCloseError,
    autoHideDuration,
}) => {
    return (
        <Snackbar open={openError} autoHideDuration={autoHideDuration} onClose={handleCloseError} data-testid='li-snack'>
            <Alert onClose={handleCloseError} severity="error">
              {error && <FormHelperText >{error}</FormHelperText>}
            </Alert>
        </Snackbar>
    );
};

const useSnackbar = (): [JSX.Element, string, (value: React.SetStateAction<string>) => void] => {
    const [error, setError] = useState('');
    const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setError('');
    };
    const snackBarData = {
        error,
        openError: !!error,
        handleCloseError,
        autoHideDuration: 3000
    }
    return [<CustomSnackbar {...snackBarData} />, error, setError];
};

export default useSnackbar;
