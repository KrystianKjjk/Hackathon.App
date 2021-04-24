import React from "react";
import style from "./App.module.css";
import Routing from "./Pages/Routing/Routing";
import SignIn from "./Components/Login/Login";
import UserList from './Components/UserList/UserList';
import Loader from './Components/Loader/Loader';

import NavigationView from './Pages/NavigationTemplate/NavigationTemplate'

function App() {
    return <Loader />;
}

export default App;
