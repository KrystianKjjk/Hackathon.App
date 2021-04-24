import React, { useState } from 'react';
import {
  Button, 
  CssBaseline,
  Typography,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StyledTextField from '../StyledTextField';
import BaseService from '../../app/baseService';
import { useHistory } from 'react-router-dom';
import styleResetPage from './ResetPassword.module.css';
import useSnackbar from '../../Hooks/useSnackbar';

export interface ResetPasswordProps {

};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#FFF'
  },
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [beenSent, setBeenSent] = useState(false);
  const [ErrorSnackbar, , setError] = useSnackbar();

  const handleSubmit = async () => {
    const service = new BaseService();
    try {
      await service.post('users/requestpasswordreset', { email })
      setBeenSent(true);
    }
    catch (error) {
      setError("Incorrect email!");
      console.log(error);
    };
  };


  const history = useHistory();
  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  }

  return (
    !beenSent ? (
      <div className={styleResetPage.backgroundPasswordReset}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Zresetuj hasło
            </Typography>
            <div className={classes.form}
            >
              <StyledTextField
                margin="normal"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                data-testid="rp-email"
                onChange={e => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-testid="rp-button"
                onClick={handleSubmit}
                style={{backgroundColor: "rgb(1, 79, 51)"}}
              >
                WYŚLIJ
          </Button>
            </div>
          </div>
          { ErrorSnackbar }

        </Container>
      </div>
    )
    :
    (
      <div>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Email with reset link has been sent!
        </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-testid="rp-button"
                onClick={routeChange}
              >
                Go back to the login page
          </Button>
            </div>  
        </Container>
      </div>
    )
  );
}