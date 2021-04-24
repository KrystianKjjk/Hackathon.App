import React from "react";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import { Route, Switch } from "react-router-dom";
import SignIn from "../Login/Login";
import NotFoundPage from "../../Components/NotFoundPage";
import CreateTeamsPage from "../CreateTeamsPage";
import UserProfile from "../UserProfile";

const AdminRouting = () => {
    return (
        <Switch>
            <PrivateRoute path="/myprofil">
                <UserProfile />
            </PrivateRoute>
            <PrivateRoute path="/teamsManagement">
                <CreateTeamsPage />
            </PrivateRoute>
            <PrivateRoute path="/createScenario">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/home">
                <UserProfile />
            </PrivateRoute>
        </Switch>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout here</div>;
};
