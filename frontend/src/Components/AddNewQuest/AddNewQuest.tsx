import React, { useState } from "react";

import { Container, Input } from "./AddNewQuest-style";
import { Quest } from "../../Models/Quest";
import { Decision } from "../../Models/Decision";
import Decisions from "../Decisions/Decisions";

import styles from "./AddNewQuest.module.css";

import { Button } from "@material-ui/core";
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
        <Container className={styles.container}>
            <h2 className={styles.header}>Dodaj nowe zadanie</h2>
            <Input
                multiline
                label={"Opis zadania"}
                value={QuizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                style={{ color: "white !important" }}
                className={styles.input}
            />
            <div>{photo}</div>
            <Button
                type="submit"
                fullWidth
                data-testid="rp-button"
                className={styles.buttonSingleScenario}
                onClick={addPhoto}
            >
                Prześlij obrazek do zadania
            </Button>
            <Decisions onSubmit={addNewDecisions} />
            <div style={{ margin: "10px" }}>
                <Button
                    type="submit"
                    fullWidth
                    data-testid="rp-button"
                    className={styles.buttonSingleScenario}
                    onClick={handleAddQuiz}
                >
                    Potwierdź
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    data-testid="rp-button"
                    className={styles.buttonSingleScenario}
                    onClick={handleCloseModal}
                >
                    Anuluj
                </Button>
            </div>
        </Container>
    );
};

export default AddNewQuest;
