import React from 'react';
import { useHistory } from "react-router";
import { Container } from './TeamList-style';
import Team from '../../Models/Team';
import AdminUserList from '../AdminUserList';
import styled from 'styled-components';
import styles from './TeamList.module.css';

interface TeamListProps {
  teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
    const history = useHistory();

  return (
    <Container className={styles.containerStyles}>
          <h3>ZESPOŁY</h3>
          {teams.map((team, idx) => (
            <TeamContainer
              key={team._id}
              className={styles.teamContainerStyles}
              onClick={() => {
                window.localStorage.setItem('toRoute', '6083bc2495cea2c66ac8c220');
                history.push("/decisions");
              }}
            >
              <AdminUserList users={team.users} title={`team ${idx + 1}`} />
            </TeamContainer>
          ))}
    </Container>
  );
};

const TeamContainer = styled.div`
  border: 2px solid black;
  margin: 5px;
  cursor: pointer
`;

export default TeamList;
