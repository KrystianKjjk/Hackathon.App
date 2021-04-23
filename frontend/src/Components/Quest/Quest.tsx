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
    instruction: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sequi alias natus blanditiis reiciendis velit ad harum repudiandae vitae esse. Czy chcesz zaprzyjaźnić się z wilkiem?",
    options: [
        {
            title: "Chcę",
            chosenBy: ["Karol", "Piotr"]
        },
        {
            title: "Nie chcę",
            chosenBy: ["Ania"]
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

    const handleOptionClick = (e: React.MouseEvent) => {
        e.preventDefault();

        console.log("Teraz trzeba wysłać zapytanie");
    }

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
                <p className={style.instruction}>
                    {instruction}
                </p>
            </div>
            
            <div className={style.optionsContainer}>
            {options.map((option, index) => {
                return <div key={index} className={style.singleOption} onClick={handleOptionClick}>
                    <p className={style.optionTitle}>{option.title}</p>
                    <ul className={style.chosenByList}>
                        {option.chosenBy.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                </div>
            })}
            </div>
        </div>
    )
    };


    export default Quest