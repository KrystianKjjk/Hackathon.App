import React from "react";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../../Components/Ranking";
import { Route, Switch } from "react-router-dom";
import SignIn from "../../Components/Login/Login";
import NotFoundPage from "../../Components/NotFoundPage";
import { Route } from "react-router";
import CreateTeamsPage from "../CreateTeamsPage";

const AdminRouting = () => {
    return (
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>
            <Route path="/logOut">
                <SignIn />
            </Route>
            <PrivateRoute path="/myprofil">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/teamsManagement">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/createScenario">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/home">
                <LogOut />
            </PrivateRoute>
            <Route path="*">
                <NotFoundPage />
            </Route>
            <Route path="teams">
                <CreateTeamsPage />
            </Route>
        </Switch>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout here</div>;
};
