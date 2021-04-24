import React from 'react';
import { Quest } from '../../Models/Scenario'
import styled from 'styled-components';

import style from './QuestDetails.module.css'

interface QuestDetailsProps {
    quest: Quest;
}

const Container = styled.div`
    background-color: white;
    margin: auto;
    padding: 5px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    width: 90%;
    min-width: 400px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    :hover {
        transform: scale(1.05);
        font-weight: bold;
        cursor: pointer;
    }
`;

const ContainerFlexible = styled.div`
    background-color: white;
    margin: auto;
    padding: 5px;
    margin-bottom: 5px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    width: 90%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    :hover {
        transform: scale(1.05);
        font-weight: bold;
        cursor: pointer;
    }
`;

const QuestDetails: React.FC<QuestDetailsProps> = ({ quest }: { quest: Quest }) => {
    return (
        <Container>
            <h3>{quest.name}</h3>
            <img src={quest.image} alt={'Obraz - ' + quest.image} />
            <h4>Decyzje:</h4>
            
            {quest.decisions.map(decision => (
                <ContainerFlexible>{decision.title}</ContainerFlexible>
            ))}
        </Container>
    );
};


export default QuestDetails;