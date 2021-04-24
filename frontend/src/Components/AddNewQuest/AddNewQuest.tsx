import React, { useState } from "react";

import { Container, Input } from "./AddNewQuest-style";
import { Quest } from "../../Models/Quest";
import { Decision } from "../../Models/Decision";
import Decisions from "../Decisions/Decisions";
import useSnackbar from "../../Hooks/useSnackbar";

interface AddNewQuestProps {
    addQuest: (quest: Quest) => void;
    closeModal: () => void;
}

const AddNewQuest: React.FC<AddNewQuestProps> = ({ addQuest, closeModal }) => {
    const [QuizDescription, setQuizDescription] = useState("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [Snackbar, setMessage, setSeverity] = useSnackbar();
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const addPhoto = () => {
        setPhoto("NowyObrazek.jpg");
    };
    const handleCloseModal = () => {
        closeModal();
    };
    const handleAddQuiz = () => {
        try{
            addQuest({
                name: QuizDescription,
                image: photo ?? "",
                decisions,
            });
            setMessage("Success!");
            setSeverity("success");
        } catch (error) {
            setMessage(error);
            setSeverity("error");
        } finally {
            closeModal();
        }
    };
    const addNewDecisions = (decision: Decision) =>
        setDecisions([...decisions, decision]);
    return (
        <>
            <Container>
                <h2>Dodaj nowe zadanie</h2>
                <Input
                    multiline
                    label={"opis Quizu"}
                    value={QuizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                />
                {photo}
                <button onClick={addPhoto}>Prześlij obrazek do zadania</button>
                <Decisions onSubmit={addNewDecisions} />
                <div style={{ margin: "10px" }}>
                    <button onClick={handleAddQuiz}>Potwierdź</button>
                    <button onClick={handleCloseModal}>Anuluj</button>
                </div>
            </Container>
            { Snackbar }
        </>
        
    );
};

export default AddNewQuest;
