import React from "react";
import style from "./App.module.css";
import Routing from "./Pages/Routing/Routing";
import SignIn from "./Components/Login/LoginWorkaround";
import UserList from './Components/UserList/UserList';
import CreateTeamsPage from './Pages/CreateTeamsPage/CreateTeamsPage';
import UserScenarioView from './Components/UserScenarioView/UserScenarioView';
import NavigationView from './Pages/NavigationTemplate/NavigationTemplate'

function App() {
    return <UserScenarioView />;
}

export default App;
