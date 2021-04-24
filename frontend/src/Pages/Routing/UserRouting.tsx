import React from "react";
import UserList from "../../Components/UserList";
import PrivateRoute from "../../Components/PrivateRoute";
import Ranking from "../Ranking";
import UserScenarioView from "../../Components/UserScenarioView/UserScenarioView"
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import SignIn from "../Login/Login";
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
                <Quest scenarioID="6083bdd60573f8c882235689" questIndex={0}/>
            </PrivateRoute>
            <PrivateRoute path="/ranking">
                <Ranking />
            </PrivateRoute>
        </Switch>
    );
};

const getScenarioAndQuest = async () => {
    const id = localStorage.getItem('id');

    // const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/group/me/${id}`);
    const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/group`);
    const data = await response.json();
    console.log(data);

    const response2 = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios`);
    const data2 = await response2.json();
    console.log(data2)

    const response3 = await fetch(`https://hackathon-backend-application.herokuapp.com/api/users`);
    const data3 = await response3.json();
    console.log(data3)
}

getScenarioAndQuest();

export default UserRouting;

const LogOut = () => {
    return <div>Logout here </div>;
};
