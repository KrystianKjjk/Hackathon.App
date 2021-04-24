import React from "react";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import { Route, Switch } from "react-router-dom";
import SignIn from "../Login/Login";
import NotFoundPage from "../../Components/NotFoundPage";
import CreateTeamsPage from "../CreateTeamsPage";
import CreateScenariosPage from "../CreateScenarios";
import UserProfile from "../UserProfile";
import CreateScenario from "../CreateScenario";
import AdminProfile from "../AdminProfile";

const AdminRouting = () => {
    return (
        <Switch>
            <PrivateRoute path="/myprofil">
                <AdminProfile />
            </PrivateRoute>
            <PrivateRoute path="/teamsManagement">
                <CreateTeamsPage />
            </PrivateRoute>
            <PrivateRoute path="/scenario/create">
                <CreateScenario />
            </PrivateRoute>
            <PrivateRoute path="/scenario">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/home">
                <UserProfile />
            </PrivateRoute>
            <Route path="*">
                <NotFoundPage />
            </Route>
        </Switch>
    );
};

export default AdminRouting;
