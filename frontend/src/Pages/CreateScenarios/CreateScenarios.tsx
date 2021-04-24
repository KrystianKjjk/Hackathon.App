import React, { useState, useEffect } from "react";
import {
    Container,
    ListContainer,
    Header,
} from "../CreateTeamsPage/CreateTeamsPage-style";

import { Scenario, Quest } from "../../Models/Scenario";
import Input from "@material-ui/core/Input";
import ScenarioList from "../../Components/ScenarioList";
import QuestDetails from "../../Components/QuestDetails/QuestDetails";
import instance from "../../Api/axiosInstance";
import styles from "./CreateScenarios.module.css";

import Modal from "react-modal";
import AdminQuestList from "../../Components/AdminQuestList";
import styled from "styled-components";
import { useHistory } from "react-router";

interface CreateScenariosPageProps {}

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as "column",
        display: "flex",
    },
};

const QuestElement = ({ quest }: { quest: Quest }) => {
    return <QuestContainer>{quest.name}</QuestContainer>;
};
const QuestContainer = styled.div`
    background-color: white;
    margin: auto;
    padding: 5px;
    border: 2px solid black;
    display: flex;
    width: 90%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    :hover {
        transform: scale(1.05);
        font-weight: bold;
        cursor: pointer;
    }
`;

const CreateScenariosPage: React.FC<CreateScenariosPageProps> = () => {
    const history = useHistory();
    const initialScenario = {
        _id: "",
        name: "",
        description: "",
        image: "",
        quests: [],
    };
    const [newScenario, setNewScenario] = useState<Scenario>(initialScenario);
    const [canConfirmNewScenarios, setCanConfirmNewScenarios] = useState(false);

    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [displayedScenario, setDisplayedScenario] = useState<
        Scenario | undefined
    >();
    const [displayedQuest, setDisplayedQuest] = useState(-1);
    const [canConfirmNewTeams, setCanConfirmNewTeams] = useState(false);
    const [loading, setLoading] = useState(false);

    const cancelCreateNewScenarioRequest = () => {
        setNewScenario(initialScenario);
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
                const allScenarios = await instance.get<Scenario[]>(
                    "scenarios"
                );
                setScenarios(allScenarios.data);
            } catch (error) {
                console.log("Nie udało sie pobrać scenariuszy");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const showScenario = (scenario: Scenario) => {
        setDisplayedScenario(scenario);
    };

    const hideScenario = () => {
        setDisplayedScenario(undefined);
        setDisplayedQuest(-1);
    };
    const createNewScenario = () => {
        history.push("/scenario/create");
    };
    return (
        <Container className={styles.createScenarioContainer}>
            <Header>SCENARIUSZE</Header>
            {displayedScenario && (
                <Modal
                    isOpen={!!displayedScenario}
                    onRequestClose={hideScenario}
                    style={customModalStyles}
                    contentLabel="Example Modal"
                >
                    <h3>{displayedScenario?.name}</h3>
                    <img
                        alt={"obraz - " + displayedScenario.name}
                        src={displayedScenario.image}
                    />
                    <h4>Questy:</h4>
                    {displayedScenario.quests.map((quest, idx) =>
                        displayedQuest !== idx ? (
                            <span onClick={() => setDisplayedQuest(idx)}>
                                <QuestElement key={idx} quest={quest} />
                            </span>
                        ) : (
                            <span onClick={() => setDisplayedQuest(-1)}>
                                <QuestDetails quest={quest} />
                            </span>
                        )
                    )}
                    <div style={{ marginTop: "20px" }}>
                        <button onClick={hideScenario}>ZAMKNIJ</button>
                    </div>
                </Modal>
            )}
            <ListContainer className={styles.listContainerStyles}>
                <ScenarioList
                    scenarios={scenarios}
                    showScenario={showScenario}
                />
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
                {canConfirmNewScenarios && (
                    <button
                        onClick={() => confirmNewScenario()}
                        className={styles.buttonCreateScenarios}
                    >
                        {" "}
                        Utwórz
                    </button>
                )}
            </div>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <button
                    onClick={() => createNewScenario()}
                    className={styles.buttonCreateScenarios1}
                >
                    UTWÓRZ NOWY SCENARIUSZ
                </button>
            </div>
        </Container>
    );
};

export default CreateScenariosPage;
