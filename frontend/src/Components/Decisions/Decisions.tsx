import { Container } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Decisions.module.css";
import CreateDecision from "../CreateDecision/CreateDecision";

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

const Decisions: React.FC<CreateDecisionProps> = ({ onSubmit }) => {
    const [decisions, setDecisions] = useState<Decision[]>([]);

    const handleAddDecision = (decision: Decision) => {
        setDecisions([...decisions, decision]);
        onSubmit(decision);
    };

    // useEffect(()=>{
    //     setDecisions([{
    //         title: 'test',
    //         risk: 12,
    //         prize: 12,
    //         punishment: 12,
    //         users: []
    //     }])

    // }, [])

    return (
        <Container className={styles.createDecisionContainer}>
            <Container>
                <h1>Decyzje</h1>
                <Container className={styles.decisionsContainer}>
                    {decisions.map((decision, id) => {
                        return (
                            <div key={id} className={styles.gridItemClass}>
                                <DisplayDecision>{decision}</DisplayDecision>
                            </div>
                        );
                    })}
                </Container>
            </Container>
            <CreateDecision onSubmit={handleAddDecision} />
        </Container>
    );
};

const DisplayDecision = (props: any) => {
    return (
        <Container>
            <div>
                <div className={styles.tileTitle}>{props.children.title}</div>
            </div>
            <div className={styles.numbersRow}>
                <div className={styles.number1}>
                    <div className={styles.valueTitle}>Ryzyko:</div>{" "}
                    <span>{props.children.risk}</span>
                </div>
                <div className={styles.number1}>
                    <div className={styles.valueTitle}>Nagroda:</div>{" "}
                    <span>{props.children.prize}</span>
                </div>
                <div className={styles.number1}>
                    <div className={styles.valueTitle}>Kara:</div>{" "}
                    <span>{props.children.punishment}</span>
                </div>
            </div>
        </Container>
    );
};
export default Decisions;
