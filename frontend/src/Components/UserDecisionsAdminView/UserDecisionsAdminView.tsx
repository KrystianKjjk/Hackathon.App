import React, {useState, useEffect } from 'react';

import { Container } from './UserDecisionsAdminView-style'

interface UserDecisionsAdminViewProps {

}

const UserDecisionsAdminView: React.FC<UserDecisionsAdminViewProps> = () => {
    const [usersDecisions, setUsersDecisions] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/6083bdd60573f8c882235689`);
            let data = await response.json();
            console.log(data.quests)
            setUsersDecisions(data.quests);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


console.log(usersDecisions)
    return (
    <Container>
        <ul>
            {usersDecisions.map((quest: any, id: number)=>{
                console.log(quest.name)
            })}
        </ul>
    </Container>
    )
    }


    export default UserDecisionsAdminView