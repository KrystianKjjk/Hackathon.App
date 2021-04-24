import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import AdminRouting from "./AdminRouting";
import Ranking from "../../Components/Ranking";
import SignIn from "../../Components/Login/Login";

const Routing = () => {
    const user = {};
    const [roleRouting, setRoleRouting] = useState(<AdminRouting />);

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                    <Route path="/logOut">
                        <SignIn />
                    </Route>
                    {roleRouting}
                    {user && (
                        <>
                            <Route path="/myprofil">
                                <Ranking />
                            </Route>
                            <Route path="/ranking">
                                <Ranking />
                            </Route>
                        </>
                    )}
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Routing;
