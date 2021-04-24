import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";

import {
    Button,
    CssBaseline,
    Link,
    Grid,
    Typography,
    Container,
    FormHelperText,
    Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import BaseService from "../../app/baseService";
import axios from "axios";
import style from "./Login.module.css";
import StyledTextField from "../../Components/StyledTextField";

export interface LogInProps {
    onLogin?: Function;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn(props: LogInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [openError, setOpenError] = useState(false);

    const history = useHistory();
    const routeChange = () => {
        let path = `/home`;
        history.push(path);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) routeChange();
    });

    const handleCloseError = (
        event?: React.SyntheticEvent,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenError(false);
    };

    const setResponseDataToLocalStorage = (response: AxiosResponse) => {
        const token = response.data?.token;
        const userId = response.data?.user._id;
        const isAdmin = response.data?.user.isAdmin;
        const user = JSON.stringify(response.data?.user);

        localStorage.setItem("token", token);
        localStorage.setItem("id", userId);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("user", user);
    };

    const handleSignInClick = async () => {
        const service = new BaseService();
        try {
            const response = await service.post("login", { email, password });
            setFormError("");
            setResponseDataToLocalStorage(response);
            axios.defaults.headers.common = {
                "x-auth-token": localStorage.getItem("token"),
            };
            routeChange();
            if (props.onLogin) props.onLogin();
        } catch (error) {
            setFormError(error?.response?.data?.message);
            setOpenError(true);
            console.log(error);
        }
    };

    return (
        <div className={style.main}>
            <div className={style.shadow}></div>
            <div className={style.shadow1}></div>
            <div className={style.shadow2}></div>
            <div className={style.shadow3}></div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <form noValidate className={`${style.form} form-login`}>
                        <fieldset className={style.fieldset}>
                            <Typography
                                component="h1"
                                variant="h5"
                                className={style.loginHeader}
                            >
                                LOGOWANIE
                            </Typography>
                            <StyledTextField
                                margin="normal"
                                label="ADRES E-MAIL"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                data-testid="li-email"
                            />
                            <StyledTextField
                                margin="normal"
                                name="password"
                                label="HASŁO"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                data-testid="li-password"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSignInClick}
                                data-testid="li-button"
                                className={style.buttonSignIn}
                            >
                                Zaloguj się
                            </Button>
                            <Snackbar
                                open={openError}
                                autoHideDuration={6000}
                                onClose={handleCloseError}
                                data-testid="li-snack"
                            >
                                <Alert
                                    onClose={handleCloseError}
                                    severity="error"
                                >
                                    {formError && (
                                        <FormHelperText>
                                            {formError}
                                        </FormHelperText>
                                    )}
                                </Alert>
                            </Snackbar>
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        href="/resetpassword"
                                        variant="body2"
                                        color="inherit"
                                        className={style.forgotPassword}
                                    >
                                        Zapomniałeś hasła?
                                    </Link>
                                </Grid>
                            </Grid>
                        </fieldset>
                    </form>
                </div>
            </Container>
        </div>
    );
}
