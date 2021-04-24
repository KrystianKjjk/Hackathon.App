import React, { useEffect } from "react";
import { removeUserFromLocalStorage } from "../../app/utils";
import { useHistory } from "react-router";

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        removeUserFromLocalStorage();
        history.push("/login");
    }, [history]);
    return <div></div>;
};

export default Logout;
