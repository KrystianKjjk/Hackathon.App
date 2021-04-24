import React, { useState, useEffect } from 'react';
import { Container, ListContainer, Header } from "../CreateTeamsPage/CreateTeamsPage-style";

import { Scenario, Quest, Decision } from "../../Models/Scenario";
import ScenarioList from "../../Components/ScenarioList";
import Input from "@material-ui/core/Input";
import instance from "../../Api/axiosInstance";
import { CircularProgress } from "@material-ui/core";
import styles from './CreateScenarios.module.css';

interface CreateScenarioProps {

}

interface CreateScenariosPageProps {}

const CreateScenariosPage: React.FC<CreateScenariosPageProps> = () => {
    const [createNewScenariosRequest, setCreateNewScenariosRequest] = useState(false);
    const [NumberOfChosenScenarios, setNumberOfChosenScenarios] = useState(0);
    const [quests, setQuests] = useState<Quest[]>([]);

    const [Scenarios, setScenarios] = useState<Scenario[]>([]);
    const [newScenarios, setNewScenarios] = useState<Scenario[] | null>(null);
    const [canConfirmNewScenarios, setCanConfirmNewScenarios] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const allQuests = await instance.get<{ quests: Quest[] }>("quests");

                setQuests(allQuests.data.quests);
            } catch (error) {
                console.log("Nie udało sie pobrać uytkowników");
            } finally {
                setLoading(false);
            }
        })();

        (async () => {
            try {
                setLoading(true);
                const allScenarios = await instance.get<Scenario[]>("/group");
                console.log("Scenarios ", allScenarios);
                setScenarios(allScenarios.data);
            } catch (error) {
                console.log("Nie udało sie pobrać zespołów");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const createNewScenarios = () => {
        let leftQuests = quests;
        var newScenarios = new Array<Scenario>(NumberOfChosenScenarios);
        let idx = 0;
        while (leftQuests.length > 0) {
            const random = Math.floor(Math.random() * leftQuests.length);
            const quest = leftQuests[random];
            leftQuests = leftQuests.filter((q) => q.id !== quest.id);

            if (!newScenarios[idx]) newScenarios[idx] = new Scenario();

            newScenarios[idx].quests.push(quest);
            idx = (idx + 1) % NumberOfChosenScenarios;
        }

        setNewScenarios(newScenarios);
        setCanConfirmNewScenarios(true);
    };
    const cancelCreateNewScenarioRequest = () => {
        setNumberOfChosenScenarios(0);
        setNewScenarios(null);
        setCreateNewScenariosRequest(false);
        setCanConfirmNewScenarios(false);
    };

    const confirmNewScenario = async () => {
        const req = { questGroups: newScenarios?.map((t) => t.quests) };
        console.log("confirm new", req);
        console.log("JSON", JSON.stringify(req));
        try {
            const result = await instance.post("/group/batchcreation", req);
        } catch (error) {
            console.log("Nie udało się przypisać Scenarioów");
        }
    };

    if (loading) return <CircularProgress />;
    return (
        <Container>
            <Header>STWÓRZ ZESPOŁY</Header>
            <ListContainer className={styles.listContainerStyles}>
                <AdminQuestList quests={quests} title={"UŻYTKOWNICY"}/>
                <ScenarioList Scenarios={newScenarios ?? Scenarios} />
            </ListContainer>
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
                            value={NumberOfChosenScenarios}
                            onChange={(e) =>
                                setNumberOfChosenScenarios(
                                    Number.isNaN(
                                        Number.parseInt(e.target.value)
                                    )
                                        ? 0
                                        : Number.parseInt(e.target.value)
                                )
                            }
                        />
                        <button onClick={() => createNewScenarios()} className={styles.buttonCreateScenarios}>
                            {" "}
                            Utwórz
                        </button>
                        <button onClick={() => cancelCreateNewScenarioRequest()} className={styles.buttonCreateScenarios}>
                            {" "}
                            Anuluj
                        </button>
                        {canConfirmNewScenarios && (
                            <button onClick={() => confirmNewScenario()} className={styles.buttonCreateScenarios}>
                                {" "}
                                Zatwierdź nowe zespoły
                            </button>
                        )}
                    </>
                )}
            </div>
        </Container>
    );
};

export default CreateScenariosPage;