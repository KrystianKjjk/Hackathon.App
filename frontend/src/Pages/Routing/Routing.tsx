import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import AdminRouting from "./AdminRouting";
import SignIn from "../Login/LoginWorkaround";
import { loggerRole } from "../../app/utils";
import UserRouting from "./UserRouting";
import Logout from "../../Components/Logout/Logout";
import ResetPassword from "../../Components/ResetPassword/ResetPassword";
import ResetPasswordFromLink from "../../Components/ResetPassword/ResetPasswordFromLink";

const Routing = () => {
    const [role, setRole] = useState(loggerRole());
    const getRouting = () =>
        role === "Admin" ? (
            <AdminRouting />
        ) : role === "User" ? (
            <UserRouting />
        ) : null;

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <SignIn setRole={setRole} />
                </Route>
                <Route exact path="/login">
                    <SignIn />
                </Route>
                <Route exact path="/logout">
                    <Logout />
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
