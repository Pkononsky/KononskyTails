import {Request, Response} from "express";

import Database from "../database";
import {getDB} from "../routes";
import {PageData} from "../middlewares/pageData";

const ADVENTURE_REQ_AMOUNT = 5;

async function getPageData(locals: PageData, adventureNames: string[], db: Database): Promise<PageData> {
    const {meta, staticBasePath, title, logo} = locals;
    const adventuresProm = adventureNames.map(async (adventureName) => {
        const adventureData = await db.getAdventureByName(adventureName);
        const hashTags = await Promise.all(adventureData.hashTags?.map((hashTagNum) => {
            return db.getHashTagsById(hashTagNum);
        }) || []);

        return {adventureData: adventureData, hashTags: hashTags};
    });

    const adventures = await Promise.all(adventuresProm);

    return {
        meta,
        staticBasePath,
        title,
        logo,
        adventures
    };
}

export async function showAdventures(req: Request, res: Response): Promise<void> {
    const db = getDB();
    const {tag} = req.params;
    const adventureNames = tag ? await db.getAllAdventuresNameByTag(tag) : await db.getAllAdventuresName();

    if (adventureNames.length) {
        const data = await getPageData(req.locals, adventureNames.slice(0, ADVENTURE_REQ_AMOUNT), db);
        res.json(data);
    } else {
        res.sendStatus(404);
    }
}

export async function getNextFiveAdventures(req: Request, res: Response): Promise<void> {
    const db = getDB();
    const {adventureName, hashTag} = req.query;

    const adventureNames = hashTag.length === 0 ? await db.getAllAdventuresName() : await db.getAllAdventuresNameByTag(hashTag);
    const adventureIndex = adventureNames.indexOf(adventureName);
    const nextAdventures = adventureNames.slice(adventureIndex + 1, adventureIndex + ADVENTURE_REQ_AMOUNT + 1);

    res.json(await getPageData(req.locals, nextAdventures, db));
}
