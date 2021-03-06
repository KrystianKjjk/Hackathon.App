import React, { useState, useEffect } from "react";
import { GiBroadsword } from "react-icons/gi";
import useSnackbar from "../../Hooks/useSnackbar";

import style from "./Ranking.module.css";

interface RankingProps {}

interface userInterface {
    name: string;
    surname: string;
    role: string;
    currentGroup: string;
    photo: string;
    email: string;
    password: string;
    isAdmin: boolean;
    totalPoints: number;
}

const Ranking: React.FC<RankingProps> = () => {
    const [users, setUsers] = useState<Array<userInterface> | null>(null);
    const [loading, setLoading] = useState(true);
    const [Snackbar, setMessage, setSeverity] = useSnackbar();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://hackathon-backend-application.herokuapp.com/api/users/"
                );
                let data = await response.json();
                data.users = data.users.filter((user: userInterface) => {
                    return user.isAdmin === false;
                });
                const users = data.users.sort((a: any, b: any) =>
                    a.totalPoints > b.totalPoints ? -1 : 1
                );
                console.log(users);
                setUsers(users);
            } catch (error) {
                setMessage("Nie udało się pobrać rankingu");
                setSeverity("error");
            } finally {
                setLoading(false);
            }
        })();
    }, [setMessage, setSeverity]);

    if (loading) {
        return <div>loading</div>;
    }

    return (
        <div className={style.containerRanking}>
            <h2 className={style.heading}>Ranking</h2>
            {users!.map((user, index) => {
                return (
                    <div key={index} className={style.rankingRow}>
                        <span>
                            <GiBroadsword />
                            <span className={style.nameSpan}>{user.name}</span>
                        </span>
                        <span>{user.totalPoints}</span>
                    </div>
                );
            })}
            {Snackbar}
        </div>
    );
};

export default Ranking;
