import React from "react";
import { Route } from "react-router";

const AdminRouting = () => {
    return (
        <>
            <Route path="/home">
                <LogOut />
            </Route>
        </>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout</div>;
};
