import React from "react";

import { Container } from "./ScenarioList-style";
import { Scenario } from "../../Models/Scenario";
import AdminQuestList from "../AdminQuestList";
import styled from "styled-components";
import styles from "./ScenarioList.module.css"

interface ScenarioListProps {
    scenarios: Scenario[];
}

const ScenarioList: React.FC<ScenarioListProps> = ({ scenarios }) => {
    return (
        <Container className={styles.containerStyles}>
            <h3>ZESPOŁY</h3>
            {scenarios.map((scenario, idx) => (
                <ScenarioContainer key={scenario._id} className={styles.scenarioContainerStyles}>
                    <AdminQuestList quests={scenario.quests} title={`scenario ${idx + 1}`} />
                </ScenarioContainer>
            ))}
        </Container>
    );
};

const ScenarioContainer = styled.div`
    border: 2px solid black;
    margin: 5px;
`;

export default ScenarioList;
