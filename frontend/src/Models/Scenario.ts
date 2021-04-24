export interface Decision {
    title: string;
    risk: number;
    prize: number;
    punishment: number;
    users: string[];
}

export interface Quest {
    id: number;
    name: string;
    image?: string;
    decisions: Decision[];
}

export interface Scenario {
    _id: string;
    description: string;
    name: string;
    image: string;
    quests: Quest[];
}
