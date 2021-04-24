import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import style, { Container } from './UserList-style';
import styleCss from './UserList.module.css';

interface IUser{
  name: string,
  surname: string,
  role: string,
  currentGroup:string,
  photo: string,
  email: string,
  password: string,
  isAdmin: boolean,
  totalPoints: number,
}

// @ts-ignore
const UserList: React.FC = ({id}) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

   const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/group/me/${id}`);
            let data = await response.json();
            setUsers(data.users);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


    if(loading){
      return <Container className={styleCss.gridClass}>loading</Container>
  }

  return (
    <>
      <Grid container direction="row">
        <Grid
          container
          item
          xs={3}
          style={style}
          justify="center"
          className={styleCss.gridClass}
        >
          <Container>
            <h1>TWOJA DRUŻYNA</h1>
            {users.map((user:any, id:number) => {
              return (
                <div key={id}>
                  <ListItem  className={styleCss.gridItemClass}>{user.name}</ListItem>
                </div>
              );
            })}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default UserList;
