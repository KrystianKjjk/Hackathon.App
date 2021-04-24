import React, { useState, useEffect } from 'react';

import style from './Quest.module.css'

interface QuestProps {
    scenarioID: string,
    questIndex: number
}

interface QuestInterface {
    image?: string,
    name: string,
    decisions: Array<{title: string, risk?: number, punishment?: number, prize?: number, users: any[]}>
}

const testQuestObject = {
    image: "https://cdn.pixabay.com/photo/2016/11/22/19/36/arctic-wolf-1850247_1280.jpg",
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sequi alias natus blanditiis reiciendis velit ad harum repudiandae vitae esse. Czy chcesz zaprzyjaźnić się z wilkiem?",
    decisions: [
        {
            title: "Chcę",
            users: ["Karol", "Piotr"]
        },
        {
            title: "Nie chcę",
            users: ["Ania"]
        },
        {
            title: "Muszę spytać mentora",
            users: ["Patryk"]
        }
    ]
}

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgzNGM5MDAzYTI1OTdlOWMwMjdiYjkiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxOTI0ODExMiwiZXhwIjoxNjE5MjUxNzEyfQ.tEX2d_ra7hYS2LdZFeNNMc8xUCosNtMbNA3A1ly16Ts';

const Quest: React.FC<QuestProps> = ({ scenarioID, questIndex }) => {

    const [quest, setQuest] = useState<QuestInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const handleOptionClick = (e: React.MouseEvent) => {
        // e.preventDefault();
        const target: any = e.currentTarget;
        let decisionIdx = target.id;
        decisionIdx = parseInt(decisionIdx);
        
        takeDecision(decisionIdx);
    }

    const takeDecision = async (decisionIdx: number) => {
        const userID = await getUserId();
    
        if(checkIfUserHasTakenDecisionYet(userID)){
            console.log('Trzeba \'untake\' decision')
            untakeDecision(decisionIdx);
        }

        const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/${scenarioID}/quest/${questIndex}/take/decision/${decisionIdx}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
              }
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
    }

    const untakeDecision = async (decisionIdx: number) => {
        const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/${scenarioID}/quest/${questIndex}/untake/decision/${decisionIdx}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
              }
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
    }

    const checkIfUserHasTakenDecisionYet = (userID: string) => {
        const decisionsArr = quest?.decisions;
        let flag = false;
        decisionsArr?.forEach((item) => {
            item.users.forEach((user) => {
                if(user._id === userID)
                    flag = true;
            })
        })
        return flag;
    }

    const getUserId = async () => {
        const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
              }
        });
        const data = await response.json();
        //console.log(data);
        return data._id;
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const r = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/`);
            const d = await r.json();
            console.log(d);
            const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/${scenarioID}`);
            console.log(response);
            let data = await response.json();
            console.log(data);
            data = data.quests[questIndex];
            if(!data.image)
                data.image = 'https://cdn.pixabay.com/photo/2016/11/22/19/36/arctic-wolf-1850247_1280.jpg';
                
            setQuest(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        
        fetchData();
        
    }, []);

    if(loading){
        return <p>loading</p>
    }

    const { image, name:instruction, decisions } = quest!;
    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img src={image} alt="" />
                <p className={style.instruction}>
                    {instruction}
                </p>
            </div>
            
            <div className={style.optionsContainer}>
            {decisions.map((decision, index) => {
                return <div key={index} id={`${index}`} className={style.singleOption} onClickCapture={(e) => handleOptionClick(e)}>
                    <p className={style.optionTitle}>{decision.title}</p>
                    <ul className={style.chosenByList}>
                        {decision.users.map((item, index) => {
                            return <li key={index}>{item.name}</li>
                        })}
                    </ul>
                </div>
            })}
            </div>
        </div>
    )
    };


    export default Quest