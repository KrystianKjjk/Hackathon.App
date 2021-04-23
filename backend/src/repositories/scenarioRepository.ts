import Repository from "./repository";
import * as mongoose from 'mongoose';

export default class ScenarioRepository extends Repository {
    
    async getAll() {
        return this.model.find({}).populate('quests.decisions.users');
    };
    async getById(id: mongoose.Types.ObjectId) {
        return this.model.findOne(id).populate('quests.decisions.users');
    };
}