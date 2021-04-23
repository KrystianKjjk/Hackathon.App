import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import useHttp from '../../Hooks/useHttp';
import ListItem from '@material-ui/core/ListItem';
import style, { Container } from './UserList-style';

type Users = Array<string>;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Users>([]);
  const [errors, setErrors] = useState();
  //   const { makeHttpRequest } = useHttp(
  //     'URL URL URL',
  //     'GET'
  //   );
  useEffect(() => {
    // const getUsers = async () => {
    //   const data = await makeHttpRequest();
    //   try {
    //     setUsers(data);
    //   } catch (error) {
    //     setErrors(error);
    //   }
    // };
    // getUsers();
    setUsers(['Arek', 'Bogdan', 'Mateusz', 'Arek', 'Bogdan', 'Mateusz']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={1}>
        <Grid
          container
          item
          xs={3}
          style={style}
          justify="center"
        >
          <Container>
            <h1>Twój zespół</h1>
            {users.map((user, id) => {
              return (
                <>
                  <ListItem key={id}>{user}</ListItem>
                </>
              );
            })}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default UserList;
