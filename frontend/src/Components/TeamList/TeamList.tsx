import React from "react";

import { Container } from "./TeamList-style";
import Team from "../../Models/Team";
import AdminUserList from "../AdminUserList";
import styled from "styled-components";
import styles from "./TeamList.module.css"

interface TeamListProps {
    teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
    console.log('TEAM', teams)
    return (
        <Container className={styles.containerStyles}>
            <h3>ZESPOŁY</h3>
            {teams.map((team, idx) => (
                <TeamContainer key={team._id} className={styles.teamContainerStyles}>
                    <AdminUserList users={team.users} title={`team ${idx + 1}`} />
                </TeamContainer>
            ))}
        </Container>
    );
};

const TeamContainer = styled.div`
    border: 2px solid black;
    margin: 5px;
`;

export default TeamList;
