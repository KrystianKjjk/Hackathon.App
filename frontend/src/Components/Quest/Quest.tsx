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


const Quest: React.FC<QuestProps> = ({ scenarioID, questIndex }) => {

    const [quest, setQuest] = useState<QuestInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const handleOptionClick = (e: React.MouseEvent) => {
        e.preventDefault();

        console.log("Teraz trzeba wysłać zapytanie");
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const s = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/`);
            const d = await s.json();
            console.log(d);
            const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/${scenarioID}`);
            let data = await response.json();
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
                return <div key={index} className={style.singleOption} onClick={handleOptionClick}>
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