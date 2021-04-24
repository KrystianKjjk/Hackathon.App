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
    const [title, setTitle] = useState('');
    const [risk, setRisk] = useState(0);
    const [prize, setPrize] = useState(0);
    const [punishment, setPunishment] = useState(0);


    const handleSubmit = async () => {
        const decision: Decision = {
            title: title,
            risk: risk,
            prize: prize,
            punishment: punishment,
            users: []
        }
        onSubmit(decision);
        console.log(decision);
        return decision;
    };


    return (
        <Container className={styles.createDecisionContainer}>
            <h3>
                Dodaj decyzję!
            </h3>
            <div className={styles.inputContainer}>
                <StyledTextField
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    name="title"
                    type="string"
                    label="Nazwa"
                    required={true}
                    />
            </div>
            <div className={styles.numberContainer}>
                <div className={styles.number}>
                    <StyledTextField
                        value={risk}
                        onChange={e => setRisk(parseInt(e.target.value))}
                        name="title"
                        type="number"
                        label="Ryzyko"
                        required={true}
                        />
                </div>
                <div className={styles.number}>
                    <StyledTextField
                        value={prize}
                        onChange={e => setPrize(parseInt(e.target.value))}
                        name="title"
                        type="number"
                        label="Nagroda"
                        required={true}
                        />
                </div>
                <div className={styles.number}>
                    <StyledTextField
                        value={punishment}
                        onChange={e => setPunishment(parseInt(e.target.value))}
                        name="title"
                        type="number"
                        label="Kara"
                        required={true}
                        />
                </div>
            </div>
           

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
                data-testid="rp-button"
                onClick={handleSubmit}

                style={{ backgroundColor: "rgb(1, 79, 51)" }}
            >
                Dodaj
          </Button>



        </Container>
    );
};
export default CreateDecision;
