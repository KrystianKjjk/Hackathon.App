import React, { useState } from "react";

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
import styling from "./CreateScenario.module.css";
import useSnackbar from "../../Hooks/useSnackbar";

interface CreateScenarioProps {}

const CreateScenario: React.FC<CreateScenarioProps> = () => {
    const [scenarioDescription, setScenarioDescription] = useState("");
    const [title, setTitle] = useState("");
    const [quests, setQuests] = useState<Quest[]>([]);
    const [addQuestModal, setAddQuestModal] = useState(false);
    const [image, setImage] = useState("");

    const closeModal = () => setAddQuestModal(false);
    const openModal = () => setAddQuestModal(true);
    const [Snackbar, setMessage, setSeverity] = useSnackbar();
    const addQuest = (quest: Quest) => setQuests((prev) => [...prev, quest]);
    const addNewQuest = () => openModal();
    const addPhoto = () => {
        setImage("ScenarioImage.jpg");
    };
    const confirmNewScenario = async () => {
        const obj = {
            description: scenarioDescription,
            name: title,
            image: image,
            quests,
        };
        console.log("CONFIRM ADD SCENARIO ");
        console.log(obj);
        try {
            const result = await instance.post("scenarios", obj);
            setMessage("Zapisano scenariusz");
            setSeverity("success");
        } catch (error) {
            setMessage("Błąd zapisywania scenariusza");
            setSeverity("error");
        } finally {
            closeModal();
        }
    };
    return (
        <>
            <Container>
                <Header>Utwórz nowy scenariusz</Header>
                <Input
                    label={"Tytuł scenariusza"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styling.inputDescription}
                />
                <Input
                    multiline
                    label={"Opis scenariusza"}
                    value={scenarioDescription}
                    onChange={(e) => setScenarioDescription(e.target.value)}
                    className={styling.inputScenario}
                />
                {image}
                <button
                    onClick={addPhoto}
                    className={styling.buttonSingleScenario}
                >
                    Prześlij obrazek do zadania
                </button>
                <h3>Zadania</h3>
                <QuestContainer>
                    {quests.map((quest, idx) => (
                        <QuestElement key={idx}>{quest.name}</QuestElement>
                    ))}
                </QuestContainer>
                <button
                    onClick={addNewQuest}
                    className={styling.buttonSingleScenario}
                >
                    Dodaj nowe zadanie
                </button>
                <BottomButton
                    onClick={confirmNewScenario}
                    className={styling.buttonSingleScenario}
                >
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
            {Snackbar}
        </>
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
        backgroundColor: "transparent",
    },
};
