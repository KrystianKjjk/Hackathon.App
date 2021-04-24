import React from "react";
import UserList from "../../Components/UserList";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../../Components/Ranking";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import SignIn from "../../Components/Login/Login";
const UserRouting = () => {
    return (
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>
            <Route path="/logOut">
                <SignIn />
            </Route>
            <PrivateRoute path="/home">
                <LogOut />
            </PrivateRoute>
            <PrivateRoute path="/myprofil">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/myteam">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/quest">
                <Ranking />
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
            <Route path="*">
                <NotFoundPage />
            </Route>
        </Switch>
    );
};

export default UserRouting;

const LogOut = () => {
    return <div>Logout here </div>;
};
