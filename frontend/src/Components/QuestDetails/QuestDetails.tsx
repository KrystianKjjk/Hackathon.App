import React from "react";
import { Quest } from "../../Models/Scenario";
import styled from "styled-components";

interface QuestDetailsProps {
    quest: Quest;
}

const Container = styled.div`
    flex-direction: column;
    background-color: rgba(200, 200, 200, 0.6);
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
const ContainerElement = styled.div`
    flex-direction: column;
    background-color: rgba(200, 200, 200, 0.6);
    margin: auto;
    padding: 5px;
    border: 2px solid black;
    display: flex;
    width: 90%;
`;
const QuestDetails: React.FC<QuestDetailsProps> = ({
    quest,
}: {
    quest: Quest;
}) => {
    return (
        <Container>
            <h3>{quest.name}</h3>
            {quest.image?.length !== undefined && quest.image.length > 100 && (
                <img src={quest.image} alt={"Obraz - " + quest.image} />
            )}
            <h4>Decyzje: (Nagrada/kara/ryzyko)</h4>

            {quest.decisions.map((decision) => (
                <ContainerElement>
                    {decision.title} /{decision.prize}/{decision.punishment}/
                    {decision.punishment}
                </ContainerElement>
            ))}
        </Container>
    );
};

export default QuestDetails;
