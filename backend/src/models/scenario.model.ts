import * as mongoose from 'mongoose';

interface User {
    name: string;
    surname: string;
    email: string;
}

export interface Decision {
    title: string;
    risk: number;
    prize: number;
    punishment: number;
    users: mongoose.Types.ObjectId[];
}

export interface Quest {
    name: string;
    image?: string;
    decisions: Decision[];
}

export interface Scenario {
    name: string;
    quests: Quest[];
}

const DecisionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    risk: {
        type: Number,
        required: true
    },
    punishment: {
        type: Number,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
});

const QuestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    decisions: [{
        type: DecisionSchema,
        required: true,
    }],
});

const ScenarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'Opis'
    },
    quests: [{
        type: QuestSchema,
        required: true,
    }],
    startDate: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Number,
        required: true,
    }
});

export default mongoose.model<Scenario & mongoose.Document>('Scenario', ScenarioSchema);
