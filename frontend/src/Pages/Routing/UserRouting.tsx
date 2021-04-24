import React from "react";
import UserList from "../../Components/UserList";
import PrivateRoute from "../../Components/PrivateRoute";
const UserRouting = () => {
    return (
        <>
            <PrivateRoute path="/home">
                <LogOut />
            </PrivateRoute>
        </>
    );
};

export default UserRouting;

const LogOut = () => {
    return <div>Logout</div>;
};
