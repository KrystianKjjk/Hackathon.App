import React from "react";
import { Typography } from "@material-ui/core";
import { Container } from "./UserProfile-style";
import { getUserFromLocalStorage } from "../../app/utils";
import style from './UserProfile.module.css';

const UserProfile: React.FC = () => {
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
            <Typography className={style.typoUserData}>IMIĘ: {user.name}</Typography>
            <Typography className={style.typoUserData}>NAZWISKO: {user.surname}</Typography>
            <Typography className={style.typoUserData}>E-MAIL: {user.email}</Typography>
            <Typography className={style.typoUserData}>POSTAĆ: {user.isAdmin ? "Admin" : "Gracz"}</Typography>
            <Typography className={style.typoUserData}>ZESPÓŁ: {user.currentGroup}</Typography>
            <Typography className={style.typoUserData}>PUNKTY: {user.totalPoints}</Typography>
        </Container>
    );
};

export default UserProfile;
