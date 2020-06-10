import {Adventure} from "../models/Adventure";
import {Achievement} from "../models/Achievement";
import {Action} from "../models/Action";
import {HashTag} from "../models/HashTag";
import {Scene} from "../models/Scene";

export interface PageData {
    meta?: {
        charset: string;
        description: string;
    };
    title?: string;
    staticBasePath?: string;
    logo?: {
        firstHalf: string;
        secondHalf: string;
    };
    adventures?: {
        adventureData: Adventure;
        hashTags: HashTag[];
    }[];
    firstScene?: string;
    currentAdventure?: string;
    scene?: Scene;
    actions?: Action[];
    achievements?: Achievement[];
}
