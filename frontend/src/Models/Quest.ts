import { Decision } from "./Decision";

export interface Quest {
    name: string;
    image?: string;
    decisions: Decision[];
}
