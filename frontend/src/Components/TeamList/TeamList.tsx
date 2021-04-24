import React, { useState } from 'react';

import { Container } from './TeamList-style';
import Team from '../../Models/Team';
import AdminUserList from '../AdminUserList';
import styled from 'styled-components';
import styles from './TeamList.module.css';
import UserDecisionsAdminView from '../UserDecisionsAdminView/UserDecisionsAdminView';

interface TeamListProps {
  teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  const [toggle, setToggle] = useState(true);
  const [id, setId] = useState('');
  return (
    <Container className={styles.containerStyles}>
      {toggle ? (
        <>
          <h3>ZESPOŁY</h3>
          {teams.map((team, idx) => (
            <TeamContainer
              key={team._id}
              className={styles.teamContainerStyles}
              onClick={() => {
                setToggle(!toggle);
                setId(team._id);
              }}
            >
              <AdminUserList users={team.users} title={`team ${idx + 1}`} />
            </TeamContainer>
          ))}
        </>
      ) : (
        <>
          <UserDecisionsAdminView id={'6083bc2495cea2c66ac8c220'} />
          <button onClick={() => setToggle(!toggle)}>Powrót do zespołów</button>
        </>
      )}
    </Container>
  );
};

const TeamContainer = styled.div`
  border: 2px solid black;
  margin: 5px;
  cursor: pointer
`;

export default TeamList;
