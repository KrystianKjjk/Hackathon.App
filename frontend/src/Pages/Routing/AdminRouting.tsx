import React from "react";
import { Route } from "react-router";
import CreateTeamsPage from "../CreateTeamsPage";

const AdminRouting = () => {
    return (
        <>
            <Route path="/home">
                <LogOut />
            </Route>
            <Route path="teams">
                <CreateTeamsPage />
            </Route>
        </>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout</div>;
};
