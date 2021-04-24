import React from "react";
import style from "./App.module.css";
import Routing from "./Pages/Routing/Routing";
<<<<<<< HEAD
import SignIn from "./Components/Login/Login";
import UserList from './Components/UserList/UserList';
import Loader from './Components/Loader/Loader';
=======
import SignIn from "./Components/Login/LoginWorkaround";
import UserList from "./Components/UserList/UserList";
import CreateTeamsPage from "./Pages/CreateTeamsPage/CreateTeamsPage";
>>>>>>> 28b0e64c2efe20e51fcc4437b564728f1fd81b0b

import NavigationView from "./Pages/NavigationTemplate/NavigationTemplate";

function App() {
    return <Loader />;
}

export default App;
