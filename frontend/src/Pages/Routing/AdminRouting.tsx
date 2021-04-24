import React from "react";
import PrivateRoute from "../../Components/PrivateRoute";

const AdminRouting = () => {
    return (
        <>
            <PrivateRoute path="/home">
                <LogOut />
            </PrivateRoute>
        </>
    );
};

export default AdminRouting;

const LogOut = () => {
    return <div>Logout</div>;
};
