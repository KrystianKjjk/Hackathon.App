import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import AdminRouting from "./AdminRouting";
import Ranking from "../Ranking";
import PrivateRoute from "../../Components/PrivateRoute";
import SignIn from "../Login/LoginWorkaround";
import { getUserFromLocalStorage, loggerRole } from "../../app/utils";
import UserRouting from "./UserRouting";
import LogOut from '../../Components/LogOut/LogOut'
import ResetPassword from '../../Components/ResetPassword/ResetPassword';
import ResetPasswordFromLink from '../../Components/ResetPassword/ResetPasswordFromLink'

const Routing = () => {
    const userInfo = getUserFromLocalStorage();
    const role = loggerRole();
    console.log("info", userInfo);
    const getRouting = () =>
        role === "Admin" ? <AdminRouting /> : <UserRouting />;

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <SignIn />
                </Route>
                <Route exact path="/login">
                    <SignIn />
                </Route>
                <Route path="/logout">
                    <LogOut />
                </Route>
                <Route path="/resetpassword">
                    <ResetPassword />
                </Route>
                <Route path="/requestpasswordreset">
                    <ResetPasswordFromLink />
                </Route>
                {getRouting()}                
                <Route path="*">
                    <NotFoundPage />
                </Route>
                
            </Switch>
        </div>
    );
};

export default Routing;
