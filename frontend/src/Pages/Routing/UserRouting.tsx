import React from "react";
import UserList from "../../Components/UserList";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import { getUserFromLocalStorage } from "../../app/utils";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import SignIn from "../Login/Login";
import UserProfile from "../../Components/UserProfile";

const UserRouting = () => {
    const user = getUserFromLocalStorage();

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
                {/*
                    // @ts-ignore */}
                <UserProfile user={user.user} />
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
