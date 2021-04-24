import React, {useEffect} from "react";
import { removeUserFromLocalStorage } from '../../app/utils'
import { useHistory } from "react-router-dom";

export default function LogOut() {   

    const history = useHistory();
    const routeChange = () => {
        let path = `/`;
        history.push(path);
    };

    useEffect(() => {
        removeUserFromLocalStorage();
        routeChange();
    }, [])

    console.log('kotlet')

    return <div/>
}

export{}