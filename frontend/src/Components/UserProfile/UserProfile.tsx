import React from 'react';
import { Typography } from '@material-ui/core';
import { Container } from './UserProfile-style';

interface User {
  name: String;
  surname: string;
  email: String;
  role: boolean;
  currentGroup: string;
  totalPoints: string;
}

const UserProfile: React.FC<User> = ({ user }: any) => {
  return (
    <Container>
      <Typography variant="h2">Witaj podróżniku</Typography>
      {user.photo.length === 0 ? (
        <img
          src={`data:image/jpeg;base64,${Buffer.from(user.photo).toString(
            'base64'
          )}`}
          alt="avatar"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      ) : null}
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
