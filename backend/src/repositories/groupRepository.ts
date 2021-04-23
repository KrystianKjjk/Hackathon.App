import  Repository from "./repository";
import * as mongoose from 'mongoose';

export default class GroupRepository extends Repository {
    async getByUserId(id: mongoose.Types.ObjectId) {
        return this.model.find({user: id});
    };
}