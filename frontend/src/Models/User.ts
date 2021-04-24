export default interface User {
    _id: string;
    name: String;
    surname: string;
    email: String;
    isAdmin: boolean;
    totalPoints: number;
    role: string;
    currentGroup: string;
    photo: any;
}
