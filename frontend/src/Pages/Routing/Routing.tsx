import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../Components/NotFoundPage";
import useConfirmModal from "../../Hooks/useConfirmModal";

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
    const [Modal, setModal] = useConfirmModal();
    return (
        <div>
            <button
                onClick={() =>
                    setModal({
                        text: "MODAL!!!",
                        handleYes: () => console.log("logging"),
                    })
                }
            >
                {" "}
                Open Modal
            </button>
            {Modal}
        </div>
    );
};

const LogOut = () => {
    return <div>Logout</div>;
};

export default Routing;
