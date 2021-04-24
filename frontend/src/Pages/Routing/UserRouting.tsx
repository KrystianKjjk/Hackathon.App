import React from "react";
import UserList from "../../Components/UserList";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import UserScenarioView from "../../Components/UserScenarioView/UserScenarioView";
import { Switch } from "react-router-dom";
import UserProfile from "../UserProfile";
import Quest from "../../Components/Quest/Quest";

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
                <UserScenarioView />
            </PrivateRoute>
            <PrivateRoute path="/myteam">
                <UserList />
            </PrivateRoute>
            <PrivateRoute path="/quest">
                <Quest />
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
        </Switch>
    );
};

export default UserRouting;
