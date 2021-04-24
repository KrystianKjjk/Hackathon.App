import User from "./User";

export default class Team {
    _id: string;
    users: User[];

    constructor() {
        this._id = "";
        this.users = [];
    }
}
