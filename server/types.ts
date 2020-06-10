import {Adventure} from "./models/Adventure";
import {Achievement} from "./models/Achievement";
import {Action} from "./models/Action";
import {HashTag} from "./models/HashTag";
import {Scene} from "./models/Scene";

export interface AdventureData {
    adventureData: Adventure;
    hashTags: HashTag[];
}

export interface SceneData {
    firstScene?: string;
    scene?: Scene;
    currentAdventure?: string;
    actions?: Action[];
    achievements?: Achievement[];
}

export interface LogoData {
    firstHalf: string;
    secondHalf: string;
}
