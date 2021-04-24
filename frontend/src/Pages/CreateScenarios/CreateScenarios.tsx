import React, { useState, useEffect } from 'react';
import { Container, ListContainer, Header } from "../CreateTeamsPage/CreateTeamsPage-style";

import { Scenario, Quest, Decision } from "../../Models/Scenario";
import Input from "@material-ui/core/Input";
import ScenarioList from "../../Components/ScenarioList";
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

    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [canConfirmNewTeams, setCanConfirmNewTeams] = useState(false);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const allScenarios = await instance.get< Scenario[] >("scenarios");
                setScenarios(allScenarios.data);
            } catch (error) {
                console.log("Nie udało sie pobrać uytkowników");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Container>
            <Header>STWÓRZ Scenariusz</Header>
            <ListContainer className={styles.listContainerStyles}>
                <ScenarioList scenarios={scenarios} />
            </ListContainer>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                
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
            </div>
        </Container>
    );
};

export default CreateScenariosPage;