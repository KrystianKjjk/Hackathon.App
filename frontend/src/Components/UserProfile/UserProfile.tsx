import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Container } from './UserProfile-style';

const UserProfile: React.FC = () => {
  const user = {
    name: 'Piotr',
    surname: 'Testowy',
    email: 'test@testowy.com',
    role: 'Mag',
    currentGroup: 'Potężne donuty',
    totalPoints: 123,
  };
  return (
    <Container>
      <Typography variant="h2">Witaj podróżniku</Typography>
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
