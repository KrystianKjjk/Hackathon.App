import * as mongoose from 'mongoose';

export interface Decision {
    text: string;
    risk: number;
    prize: number;
    punishment: number;
}

export interface Quest {
    name: string;
    decisions: Decision[];
}

export interface Scenario {
    name: string;
    quests: Quest[];
}

const ScenarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quests: [{
        type: Object,
        required: false,
    }],
});

export default mongoose.model<Scenario & mongoose.Document>('Scenario', ScenarioSchema);
