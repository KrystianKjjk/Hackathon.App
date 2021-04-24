import React, { useState, useEffect } from "react";

import { Container, Input } from "./AddNewQuest-style";
import { Quest } from "../../Models/Quest";
import { Decision } from "../../Models/Decision";

interface AddNewQuestProps {
    addQuest: (quest: Quest) => void;
    closeModal: () => void;
}

const AddNewQuest: React.FC<AddNewQuestProps> = ({ addQuest, closeModal }) => {
    const [QuizDescription, setQuizDescription] = useState("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const addPhoto = () => {
        setPhoto("NowyObrazek.jpg");
    };
    const handleCloseModal = () => {
        closeModal();
    };
    const handleAddQuiz = () => {
        addQuest({
            name: QuizDescription,
            image: photo ?? "",
            decisions,
        });
        closeModal();
    };
    const addNewDecisions = (decision: Decision) =>
        setDecisions([...decisions, decision]);
    return (
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
            <div style={{ margin: "10px" }}>
                <button onClick={handleAddQuiz}>Potwierdź</button>
                <button onClick={handleCloseModal}>Anuluj</button>
            </div>
        </Container>
    );
};

export default AddNewQuest;
