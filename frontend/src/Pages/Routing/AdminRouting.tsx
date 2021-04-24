import React from "react";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import { Route, Switch } from "react-router-dom";
import SignIn from "../Login/Login";
import NotFoundPage from "../../Components/NotFoundPage";
import CreateTeamsPage from "../CreateTeamsPage";
import UserProfile from "../../Components/UserProfile";
import { getUserFromLocalStorage } from "../../app/utils";

const AdminRouting = () => {
    const user = getUserFromLocalStorage();
    return (
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>
            <Route path="/logOut">
                <SignIn />
            </Route>
            <PrivateRoute path="/myprofil">
                {/*
                    // @ts-ignore */}
            <UserProfile user={user.user} />
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
                <LogOut />
            </PrivateRoute>
            <Route path="*">
                <NotFoundPage />
            </Route>
        </Switch>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout here</div>;
};
