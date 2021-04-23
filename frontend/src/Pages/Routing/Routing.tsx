import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import useConfirmModal from "../../Hooks/useConfirmModal";
import AdminRouting from "./AdminRouting";
import Ranking from "../../Components/Ranking";
import SignIn from "../../Components/Login/Login";

const Routing = () => {
    const [roleRouting, setRoleRouting] = useState(<AdminRouting />);

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LogIn />
                    </Route>
                    <Route path="/logOut">
                        <LogOut />
                    </Route>
                    {roleRouting}
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

const LogIn = () => {
    return <Ranking />
};

const LogOut = () => {
    return <div>Logout</div>;
};

export default Routing;
