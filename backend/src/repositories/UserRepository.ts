import Repository from './Repository';
import { UserModel } from '../models/User.model';
import * as mongoose from 'mongoose';

export default class UserRepository extends Repository {
    async getByEmail(email: string) {
        return this.model.findOne({ email });
    }
    
    async getUserInfoById(id: mongoose.Types.ObjectId): Promise<mongoose.Document<UserModel> & UserModel | null> {
        return this.model.findOne({_id: id}, {_id: 0, password: 0});
    }

};
