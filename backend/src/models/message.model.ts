import * as mongoose from 'mongoose';


export interface Message {
    userId: string
    name: string;
    text: string;
    group: string;
    date: string
}


const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model<Message & mongoose.Document>('Message', MessageSchema);