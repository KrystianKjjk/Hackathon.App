import React from "react";
import UserList from "../../Components/UserList";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import SignIn from "../Login/Login";
import UserProfile from "../UserProfile";

const UserRouting = () => {

    return (
        <Switch>
            <PrivateRoute path="/home">
                <UserProfile />
            </PrivateRoute>
            <PrivateRoute path="/myprofil">
                <UserProfile />
            </PrivateRoute>
            <PrivateRoute path="/scenario">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/myteam">
                <UserList />
            </PrivateRoute>
            <PrivateRoute path="/quest">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
        </Switch>
    );
};

export default UserRouting;

const LogOut = () => {
    return <div>Logout here </div>;
};
