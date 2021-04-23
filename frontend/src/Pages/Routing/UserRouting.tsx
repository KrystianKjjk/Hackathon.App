import React from "react";
import { Route } from "react-router";

const UserRouting = () => {
    return (
        <>
            <Route path="/home">
                <LogOut />
            </Route>
        </>
    );
};

export default UserRouting;

const LogOut = () => {
    return <div>Logout</div>;
};
