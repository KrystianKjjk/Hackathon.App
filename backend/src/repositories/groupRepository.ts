import Repository from "./repository";
import * as mongoose from 'mongoose';

export default class GroupRepository extends Repository {
    async getByUserId(id: mongoose.Types.ObjectId) {
        const newId = String(id);
        return this.model.findOne({"users.id": newId});
    };
}