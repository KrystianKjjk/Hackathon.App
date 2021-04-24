import React, { useState, useEffect } from 'react';
import { Container, ListContainer, Header } from "../CreateTeamsPage/CreateTeamsPage-style";

import { Scenario, Quest, Decision } from "../../Models/Scenario";
import Input from "@material-ui/core/Input";
import instance from "../../Api/axiosInstance";
import styles from './CreateScenarios.module.css';

interface CreateScenarioProps {

}

interface CreateScenariosPageProps {}

const CreateScenariosPage: React.FC<CreateScenariosPageProps> = () => {
    const [createNewScenariosRequest, setCreateNewScenariosRequest] = useState(false);
    const initialScenario = {
        _id: '',
        name: '',
        image: '',
        quests: [],
    };
    const [newScenario, setNewScenario] = useState<Scenario>(initialScenario);
    const [canConfirmNewScenarios, setCanConfirmNewScenarios] = useState(false);

    const cancelCreateNewScenarioRequest = () => {
        setNewScenario(initialScenario);
        setCreateNewScenariosRequest(false);
        setCanConfirmNewScenarios(false);
    };

    const confirmNewScenario = async () => {
        const req = { newScenario };
        console.log("confirm new", req);
        console.log("JSON", JSON.stringify(req));
        try {
            const result = await instance.post("/scenarios", req);
        } catch (error) {
            console.log("Nie udało się utworzyć scenariusza");
        }
    };

    return (
        <Container>
            <Header>STWÓRZ Scenariusz</Header>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                {createNewScenariosRequest || (
                    <button onClick={() => setCreateNewScenariosRequest(true)} className={styles.buttonCreateScenarios1}>
                        {" "}
                        UTWÓRZ NOWE ZESPOŁY
                    </button>
                )}
                {createNewScenariosRequest && (
                    <>
                        <Input
                            value={newScenario.name}
                            onChange={(e) =>
                                setNewScenario({
                                    ...newScenario,
                                    name: e.target.value,
                                })
                            }
                        />
                        { canConfirmNewScenarios && <button onClick={() => confirmNewScenario()} className={styles.buttonCreateScenarios}>
                            {" "}
                            Utwórz
                        </button> }
                        <button onClick={() => cancelCreateNewScenarioRequest()} className={styles.buttonCreateScenarios}>
                            {" "}
                            Anuluj
                        </button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default CreateScenariosPage;