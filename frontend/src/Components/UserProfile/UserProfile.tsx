import React  from 'react';
import { Typography } from '@material-ui/core';
import { Container } from './UserProfile-style';

const UserProfile: React.FC = ({user}:any) => {

  return (
    <Container>
      <Typography>Imię: {user.name}</Typography>
      <Typography>Nazwisko: {user.surname}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Postać: {user.role}</Typography>
      <Typography>Zespół: {user.currentGroup}</Typography>
      <Typography>Punkty: {user.totalPoints}</Typography>
    </Container>
  );
};

export default UserProfile;
