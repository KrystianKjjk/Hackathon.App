import { Button, Container, Input } from "@material-ui/core";
import React, { useState } from "react";
import User from "../../Models/User";
import StyledTextField from "../StyledTextField";
import styles from "./CreateDecision.module.css";

interface CreateDecisionProps {
    onSubmit: Function;
}

interface Decision {
    title: string;
    risk: number;
    prize: number;
    punishment: number;
    users: String[];
}

const CreateDecision: React.FC<CreateDecisionProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [risk, setRisk] = useState(0);
    const [prize, setPrize] = useState(0);
    const [punishment, setPunishment] = useState(0);

    const handleSubmit = async () => {
        const decision: Decision = {
            title: title,
            risk: risk,
            prize: prize,
            punishment: punishment,
            users: [],
        };
        onSubmit(decision);
        return decision;
    };

    return (
        <Container className={styles.createDecisionContainer}>
            <h3>Dodaj decyzję!</h3>
            <div className={styles.inputContainer}>
                <StyledTextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    type="string"
                    label="Nazwa"
                    required={true}
                    color="primary"
                />
            </div>
            <div className={styles.numberContainer}>
                <div className={styles.number}>
                    <StyledTextField
                        value={risk}
                        onChange={(e) => setRisk(parseInt(e.target.value))}
                        name="title"
                        type="number"
                        label="Ryzyko (0-100)"
                        required={true}
                    />
                </div>
                <div className={styles.number}>
                    <StyledTextField
                        value={prize}
                        onChange={(e) => setPrize(parseInt(e.target.value))}
                        name="title"
                        type="number"
                        label="Nagroda  (0-100)"
                        required={true}
                    />
                </div>
                <div className={styles.number}>
                    <StyledTextField
                        value={punishment}
                        onChange={(e) =>
                            setPunishment(parseInt(e.target.value))
                        }
                        name="title"
                        type="number"
                        label="Kara  (0-100)"
                        required={true}
                    />
                </div>
            </div>

            <Button
                type="submit"
                fullWidth
                data-testid="rp-button"
                onClick={handleSubmit}
                className={styles.buttonSingleScenario}
            >
                Dodaj
            </Button>
        </Container>
    );
};
export default CreateDecision;
