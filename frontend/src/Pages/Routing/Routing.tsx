import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import useConfirmModal from "../../Hooks/useConfirmModal";
import Quest from "../../Components/Quest";

const Routing = () => {
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
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

const LogIn = () => {
    return <Quest />
};

const LogOut = () => {
    return <div>Logout</div>;
};

export default Routing;
