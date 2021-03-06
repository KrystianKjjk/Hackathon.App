import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";

import {
    Button,
    CssBaseline,
    Link,
    Grid,
    Typography,
    Container
} from "@material-ui/core";
import BaseService from "../../app/baseService";
import axios from "axios";
import style from "./Login.module.css";
import StyledTextField from "../../Components/StyledTextField";
import { loggerRole } from "../../app/utils";
import useSnackbar from "../../Hooks/useSnackbar";

export interface LogInProps {
    onLogin?: Function;
    setRole?: Function;
}

export default function SignIn(props: LogInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Snackbar, setMessage, setSeverity] = useSnackbar();

    const history = useHistory();
    const routeChange = () => {
        let path = `/home`;
        history.push(path);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) routeChange();
    });

    const setResponseDataToLocalStorage = (response: AxiosResponse) => {
        const token = response.data?.token;
        const userId = response.data?.user._id;
        const isAdmin = response.data?.user.isAdmin;
        const user = JSON.stringify(response.data?.user);

        localStorage.setItem("token", token);
        localStorage.setItem("id", userId);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("user", user);

        props.setRole && props.setRole(loggerRole());
    };

    const handleSignInClick = async () => {
        const service = new BaseService();
        try {
            const response = await service.post("login", { email, password });
            setMessage("");
            setResponseDataToLocalStorage(response);
            axios.defaults.headers.common = {
                "x-auth-token": localStorage.getItem("token"),
            };
            setMessage("Logowanie zakończone");
            setSeverity("success");
            routeChange();
            if (props.onLogin) props.onLogin();
        } catch (error) {
            setMessage("Błąd logowania");
            setSeverity("error");
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
                            <Grid container>
                                <Grid item xs className={style.gridPassword}>
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
            { Snackbar }
        </div>
    );
}
