import Repository from "./repository";
import * as mongoose from 'mongoose';

export default class GroupRepository extends Repository {
    async getByUserId(id: mongoose.Types.ObjectId) {
        const newId = String(id);
        return this.model.findOne({"users.id": newId});
    };

    async getAllActive() {
        return this.model.find({isActive: true});
    }

    async deactivateAll() {
        return this.model.updateMany({isActive: true}, {isActive: false});
    }

    async deactivateOlderThan(date: Date) {
        return this.model.updateMany( { createdAt : {"$lt" : date } }, { isActive: false } );
    }
}