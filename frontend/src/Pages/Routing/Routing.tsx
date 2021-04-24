import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import AdminRouting from "./AdminRouting";
import SignIn from "../Login/LoginWorkaround";
import { getUserFromLocalStorage, loggerRole } from "../../app/utils";
import UserRouting from "./UserRouting";
import Logout from "../../Components/Logout/Logout";

const Routing = () => {
    const [userInfo, setUserInfo] = useState(getUserFromLocalStorage());
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
                    <SignIn />
                </Route>
                <Route exact path="/login">
                    <SignIn />
                </Route>
                <Route exact path="/logout">
                    <Logout />
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
