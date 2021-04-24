import React from "react";
import { Typography } from "@material-ui/core";
import { Container } from "./AdminProfile-style";
import { getUserFromLocalStorage } from "../../app/utils";
import style from './AdminProfile.module.css';

const AdminProfile: React.FC = () => {
    const { user } = getUserFromLocalStorage();
    if (!user) return <div>It should happend</div>;
    return (
        <Container>
            <Typography variant="h2" className={style.typoUserPage}>Witaj podróżniku!</Typography>
            {user.photo.length === 0 ? (
                <img
                    src={`data:image/jpeg;base64,${Buffer.from(
                        user.photo
                    ).toString("base64")}`}
                    alt="avatar"
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : null}
            <Typography className={style.typoAdminData}>IMIĘ: {user.name}</Typography>
            <Typography className={style.typoAdminData}>NAZWISKO: {user.surname}</Typography>
            <Typography className={style.typoAdminData}>EMAIL: {user.email}</Typography>
            <Typography className={style.typoAdminData}>POSTAĆ: {user.isAdmin ? "Król użytkowników (admin)" : "User"}</Typography>
        </Container>
    );
};

export default AdminProfile;
