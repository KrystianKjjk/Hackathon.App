import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import AdminRouting from "./AdminRouting";
import Ranking from "../../Components/Ranking";
import PrivateRoute from "../../Components/PrivateRoute";
import SignIn from "../../Components/Login/LoginWorkaround";

const Routing = () => {
    const user = {};
    const [roleRouting, setRoleRouting] = useState(<AdminRouting />);

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <SignIn />
                </Route>
                <Route path="/logOut">
                    <SignIn />
                </Route>

                {roleRouting}
                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
        </div>
    );
};

export default Routing;
