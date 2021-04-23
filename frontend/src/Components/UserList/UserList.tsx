import React from "react";
import { Container } from "./UserList-style";
import User from "../../Models/User";
import styled from "styled-components";

interface UserListProps {
    users: User[];
    title: string;
}

const UserList: React.FC<UserListProps> = ({ users, title }) => {
    return (
        <Container>
            <h3>{title}</h3>
            {users.map((user) => (
                <UserElement key={user._id} user={user} />
            ))}
        </Container>
    );
};
const UserElement = ({ user }: { user: User }) => {
    return (
        <UserContainer>
            {user.name} {user.surname}
        </UserContainer>
    );
};
const UserContainer = styled.div`
    background-color: white;
    margin: 5px;
    padding: 5px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        transform: scale(1.05);
        font-weight: bold;
        cursor: pointer;
    }
`;
export default UserList;
