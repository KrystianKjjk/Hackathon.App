import * as mongoose from 'mongoose';
import { IUser } from './user.model'

export interface Group {
    users: IUser[],
    scenario: String,
    currentQuest: String,
    messages: String[]
    isActive: boolean,
};

const GroupSchema = new mongoose.Schema({
    users:[],
    scenario: {
        type: String
    },
    currentQuest: {
        type: String
    },
    messages: [],
    isActive: {
        type: Boolean,
        default: true,
    },

}, {timestamps: true})


export default mongoose.model<Group & mongoose.Document>('Group', GroupSchema);