import React, { useState, useEffect } from 'react';

import style from './Quest.module.css'

interface QuestProps {

}

interface QuestInterface {
    image: string,
    instruction: string,
    options: Array<{title: string, chosenBy: string[]}>
}

const testQuestObject = {
    image: "https://cdn.pixabay.com/photo/2016/11/22/19/36/arctic-wolf-1850247_1280.jpg",
    instruction: "Czy chcesz zaprzyjaźnić się z wilkiem?",
    options: [
        {
            title: "Chcę",
            chosenBy: ["Karol, Piotr"]
        },
        {
            title: "Nie chcę",
            chosenBy: []
        },
        {
            title: "Muszę spytać mentora",
            chosenBy: ["Patryk"]
        }
    ]
}


const Quest: React.FC<QuestProps> = () => {

    const [quest, setQuest] = useState<QuestInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        /*here we will send api request for a particular quest*/
        setQuest(testQuestObject);

        setLoading(false);
    }, []);

    if(loading){
        return <p>loading</p>
    }

    const { image, instruction, options } = quest!;
    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img src={image} alt="" />
            </div>
            <p className={style.instruction}>
                {instruction}
            </p>
            <div className={style.optionsContainer}>
            {options.map((option, index) => {
                return <p key={index}>{option.title}</p>
            })}
            </div>
        </div>
    )
    };


    export default Quest