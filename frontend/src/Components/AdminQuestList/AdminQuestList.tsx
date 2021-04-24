import React from "react";
import { Container } from "./AdminQuestList-style";
import { Quest } from "../../Models/Scenario";
import styled from "styled-components";
import styles from "./AdminQuestList.module.css";

interface QuestListProps {
    quests: Quest[];
    title: string;
}

const AdminQuestList: React.FC<QuestListProps> = ({ quests, title }) => {
    return (
        <Container className={styles.questsContainerStyles}>
            <h3>{title}</h3>
            {quests.map((quest) => (
                <QuestElement key={quest.id} quest={quest} />
            ))}
        </Container>
    );
};
const QuestElement = ({ quest }: { quest: Quest }) => {
    return <QuestContainer>{quest.name}</QuestContainer>;
};
const QuestContainer = styled.div`
    background-color: white;
    margin: auto;
    padding: 5px;
    border: 2px solid black;
    display: flex;
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
export default AdminQuestList;
