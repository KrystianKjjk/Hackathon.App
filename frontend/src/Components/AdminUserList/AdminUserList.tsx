import React from "react";
import { Container } from "./AdminUserList-style";
import User from "../../Models/User";
import styled from "styled-components";
import styles from "./AdminUserList.module.css";

interface UserListProps {
    users: User[];
    title: string;
}

const AdminUserList: React.FC<UserListProps> = ({ users, title }) => {
    return (
        <Container className={styles.usersContainerStyles}>
            <h3>{title}</h3>
            {users.map((user) => (
                <UserElement key={user._id} user={user}/>
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
    margin: auto;
    padding: 5px;
    border: 2px solid black;
    display: flex;
    width: 90%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    :hover {
        transform: scale(1.05);
        font-weight: bold;
        cursor: pointer;
    }
`;
export default AdminUserList;
