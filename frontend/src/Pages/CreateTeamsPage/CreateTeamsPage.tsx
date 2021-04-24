import React, { useState, useEffect } from "react";

import { Container, ListContainer, Header } from "./CreateTeamsPage-style";
import AdminUserList from "../../Components/AdminUserList";
import User from "../../Models/User";
import Team from "../../Models/Team";
import TeamList from "../../Components/TeamList";
import Input from "@material-ui/core/Input";
import instance from "../../Api/axiosInstance";
import { CircularProgress } from "@material-ui/core";
import styles from './CreateTeamsPageProps.module.css';

interface CreateTeamsPageProps {}

const CreateTeamsPage: React.FC<CreateTeamsPageProps> = () => {
    const [createNewTeamsRequest, setCreateNewTeamsRequest] = useState(false);
    const [NumberOfChosenTeams, setNumberOfChosenTeams] = useState(0);
    const [users, setUsers] = useState<User[]>([]);

    const [teams, setTeams] = useState<Team[]>([]);
    const [newTeams, setNewTeams] = useState<Team[] | null>(null);
    const [canConfirmNewTeams, setCanConfirmNewTeams] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const allUsers = await instance.get<{ users: User[] }>("users");

                setUsers(allUsers.data.users);
            } catch (error) {
                console.log("Nie udało sie pobrać uytkowników");
            } finally {
                setLoading(false);
            }
        })();

        (async () => {
            try {
                setLoading(true);
                const allTeams = await instance.get<Team[]>("/group");
                console.log("Teams ", allTeams);
                setTeams(allTeams.data);
            } catch (error) {
                console.log("Nie udało sie pobrać zespołów");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const createNewTeams = () => {
        let leftUsers = users;
        var newTeams = new Array<Team>(NumberOfChosenTeams);
        let idx = 0;
        while (leftUsers.length > 0) {
            const random = Math.floor(Math.random() * leftUsers.length);
            const user = leftUsers[random];
            leftUsers = leftUsers.filter((u) => u._id !== user._id);

            if (!newTeams[idx]) newTeams[idx] = new Team();

            newTeams[idx].users.push(user);
            idx = (idx + 1) % NumberOfChosenTeams;
        }

        setNewTeams(newTeams);
        setCanConfirmNewTeams(true);
    };
    const cancelCreateNewTeamRequest = () => {
        setNumberOfChosenTeams(0);
        setNewTeams(null);
        setCreateNewTeamsRequest(false);
        setCanConfirmNewTeams(false);
    };

    const confirmNewTeam = async () => {
        const req = { userGroups: newTeams?.map((t) => t.users) };
        console.log("confirm new", req);
        console.log("JSON", JSON.stringify(req));
        try {
            const result = await instance.post("/group/batchcreation", req);
        } catch (error) {
            console.log("Nie udało się przypisać teamów");
        }
    };

    if (loading) return <CircularProgress />;
    return (
        <Container>
            <Header>STWÓRZ ZESPOŁY</Header>
            <ListContainer className={styles.listContainerStyles}>
                <AdminUserList users={users} title={"UŻYTKOWNICY"}/>
                <TeamList teams={newTeams ?? teams} />
            </ListContainer>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                {createNewTeamsRequest || (
                    <button onClick={() => setCreateNewTeamsRequest(true)} className={styles.buttonCreateTeams1}>
                        {" "}
                        UTWÓRZ NOWE ZESPOŁY
                    </button>
                )}
                {createNewTeamsRequest && (
                    <>
                        <Input
                            value={NumberOfChosenTeams}
                            onChange={(e) =>
                                setNumberOfChosenTeams(
                                    Number.isNaN(
                                        Number.parseInt(e.target.value)
                                    )
                                        ? 0
                                        : Number.parseInt(e.target.value)
                                )
                            }
                        />
                        <button onClick={() => createNewTeams()} className={styles.buttonCreateTeams}>
                            {" "}
                            Utwórz
                        </button>
                        <button onClick={() => cancelCreateNewTeamRequest()} className={styles.buttonCreateTeams}>
                            {" "}
                            Anuluj
                        </button>
                        {canConfirmNewTeams && (
                            <button onClick={() => confirmNewTeam()} className={styles.buttonCreateTeams}>
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

export default CreateTeamsPage;