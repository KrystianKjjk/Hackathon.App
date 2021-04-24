import React, { useState, useEffect } from "react";

import {
    Container,
    Header,
    Input,
    QuestElement,
    QuestContainer,
    BottomButton,
} from "./CreateScenario-style";
import { Quest } from "../../Models/Quest";
import Modal from "react-modal";
import AddNewQuest from "../../Components/AddNewQuest";
import instance from "../../Api/axiosInstance";

interface CreateScenarioProps {}

const CreateScenario: React.FC<CreateScenarioProps> = () => {
    const [scenarioDescription, setScenarioDescription] = useState("");
    const [quests, setQuests] = useState<Quest[]>([]);
    const [addQuestModal, setAddQuestModal] = useState(false);
    const [image, setImage] = useState("");

    const closeModal = () => setAddQuestModal(false);
    const openModal = () => setAddQuestModal(true);
    const addQuest = (quest: Quest) => setQuests((prev) => [...prev, quest]);
    const addNewQuest = () => openModal();
    const addPhoto = () => {
        setImage("ScenarioImage.jpg");
    };
    const confirmNewScenario = async () => {
        const obj = {
            name: scenarioDescription,
            image: image,
            quests,
        };
        console.log("CONFIRM ADD SCENARIO ");
        console.log(obj);
        try {
            const result = await instance.post("scenarios", obj);
        } catch (error) {
            console.log("Nieee");
        }
    };
    return (
        <Container>
            <Header>Utwórz nowy scenariusz</Header>
            <Input
                multiline
                label={"Opis scenariusza"}
                value={scenarioDescription}
                onChange={(e) => setScenarioDescription(e.target.value)}
            />
            {image}
            <button onClick={addPhoto}>Prześlij obrazek do zadania</button>
            <h3>Zadania</h3>
            <QuestContainer>
                {quests.map((quest, idx) => (
                    <QuestElement key={idx}>{quest.name}</QuestElement>
                ))}
            </QuestContainer>
            <button onClick={addNewQuest}>Dodaj nowe zadanie</button>
            <BottomButton onClick={confirmNewScenario}>
                Zatwierdź scenariusz
            </BottomButton>
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
        top: "50%",
        left: "50%",
        marginRight: "-5%",
        transform: "translate(-50%, -50%)",
        flexDirection: "column" as "column",
        alignItems: "center",
        display: "flex",
        height: "80%",
    },
};
