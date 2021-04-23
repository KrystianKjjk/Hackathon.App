import React from "react";

import { Container } from "./TeamList-style";
import Team from "../../Models/Team";
import UserList from "../UserList";
import styled from "styled-components";

interface TeamListProps {
    teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
    return (
        <Container>
            <h3>Zespoły</h3>
            {teams.map((team, idx) => (
                <TeamContainer key={team._id}>
                    <UserList users={team.users} title={`team ${idx + 1}`} />
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
