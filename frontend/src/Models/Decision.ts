import User from "./User";

export interface Decision {
    title: string;
    risk: number;
    prize: number;
    punishment: number;
    users: User[];
}
