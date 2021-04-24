import React from "react";

import { Container } from "./ScenarioList-style";
import { Scenario } from "../../Models/Scenario";
import AdminQuestList from "../AdminQuestList";
import styled from "styled-components";
import styles from "./ScenarioList.module.css"

interface ScenarioListProps {
    scenarios: Scenario[];
    showScenario: (scenario: Scenario) => void;
}

const ScenarioList: React.FC<ScenarioListProps> = ({ scenarios, showScenario }) => {
    return (
        <Container className={styles.containerStyles}>
            <h3>SCENARIUSZE</h3>
            {scenarios.map((scenario, idx) => (
                <ScenarioContainer key={scenario._id} className={styles.scenarioContainerStyles} onClick={() => showScenario(scenario)}>
                    <AdminQuestList quests={scenario.quests} title={scenario.name} />
                </ScenarioContainer>
            ))}
        </Container>
    );
};

const ScenarioContainer = styled.div`
    border: 2px solid black;
    margin: 5px;
    :hover {
        transform: scale(1.03);
        font-weight: bold;
        cursor: pointer;
    }
`;

export default ScenarioList;
