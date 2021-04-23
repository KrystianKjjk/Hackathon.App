import React from "react";

import { Container } from "./TeamList-style";
import Team from "../../Models/Team";
import UserList2 from "../UserList2";
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
                    <UserList2 users={team.users} title={`team ${idx + 1}`} />
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
