import React, { useState, useEffect } from "react";

import {
    Container,
    Header,
    Input,
    QuestElement,
    QuestContainer,
} from "./CreateScenario-style";
import { Quest } from "../../Models/Quest";
import Modal from "react-modal";
import AddNewQuest from "../../Components/AddNewQuest";

interface CreateScenarioProps {}

const CreateScenario: React.FC<CreateScenarioProps> = () => {
    const [scenarioDescription, setScenarioDescription] = useState("");
    const [quests, setQuests] = useState<Quest[]>([]);
    const [addQuestModal, setAddQuestModal] = useState(false);

    const closeModal = () => setAddQuestModal(false);
    const openModal = () => setAddQuestModal(true);
    const addQuest = (quest: Quest) => setQuests((prev) => [...prev, quest]);
    const addNewQuest = () => openModal();
    return (
        <Container>
            <Header>Utwórz nowy scenariusz</Header>
            <Input
                multiline
                label={"Opis scenariusza"}
                value={scenarioDescription}
                onChange={(e) => setScenarioDescription(e.target.value)}
            />
            <h3>Zadania</h3>
            <QuestContainer>
                {quests.map((quest, idx) => (
                    <QuestElement key={idx}>{quest.name}</QuestElement>
                ))}
            </QuestContainer>
            <button onClick={addNewQuest}>Dodaj nowe zadanie</button>
            <Modal
                isOpen={addQuestModal}
                style={customStyles}
                contentLabel="Dodaj quest"
            >
                <AddNewQuest addQuest={addQuest} closeModal={closeModal} />
            </Modal>
        </Container>
    );
};

export default CreateScenario;

const customStyles = {
    content: {
        top: "30%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as "column",
        display: "flex",
    },
};
