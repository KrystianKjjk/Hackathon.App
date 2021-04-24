import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { Container, FlexContainer } from './UserDecisionsAdminView-style';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

interface UserDecisionsAdminViewProps {}

const UserDecisionsAdminView: React.FC<UserDecisionsAdminViewProps> = () => {
  const [usersDecisions, setUsersDecisions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://hackathon-backend-application.herokuapp.com/api/scenarios/6083bdd60573f8c882235689`
      );
      let data = await response.json();
      console.log(data.quests);
      setUsersDecisions(data.quests);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('calość', usersDecisions);
  return (
    <>
      <Grid container direction="row">
        {usersDecisions.map((quest: any, id: number) => {
          return (
            <Grid container item justify="center" xs={12} alignContent='center'>
              <Typography variant="h2" key={id}>
                <span>Zadanie:</span> {quest.name}
              </Typography>
              <Grid container item justify="center" xs={12}>
                {quest.decisions.map((decisions: any, id: number) => {
                  return (
                    <FlexContainer key={id}>
                      <h3>
                        <span>Ścieżka: </span> {decisions.title}
                      </h3>
                      <ListItem>
                        <span>Ryzyko decyzji: </span>
                        {decisions.risk}
                      </ListItem>
                      <ListItem>
                        <span>Kara za podjęcie decyzji:</span>
                        {decisions.punishment}
                      </ListItem>
                      <ListItem>
                        <span>Nagroda:</span> {decisions.prize}
                      </ListItem>

                      <Grid container item justify="center" xs={12}>
                        {decisions.users.map((user: any, id: number) => {
                          return (
                            <FlexContainer key={id}>
                              <h4 key={id}>Użytkownicy</h4>
                              <ListItem>
                                <span>Imie:</span> {user.name}
                              </ListItem>
                              <ListItem>
                                <span>Nazwisko: </span> {user.surname}
                              </ListItem>
                              <ListItem>
                                <span>Id użytkownika: </span> {user._id}
                              </ListItem>
                            </FlexContainer>
                          );
                        })}
                      </Grid>
                    </FlexContainer>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default UserDecisionsAdminView;
