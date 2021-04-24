import React from "react";
import { Route } from "react-router";
import CreateTeamsPage from "../CreateTeamsPage";
import CreateScenariosPage from "../CreateScenarios";

const AdminRouting = () => {
    return (
        <>
            <Route path="/home">
                <LogOut />
            </Route>
            <Route path="/teams">
                <CreateTeamsPage />
            </Route>
            <Route path="/scenario/create">
                <CreateScenariosPage />
            </Route>
        </>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout</div>;
};
