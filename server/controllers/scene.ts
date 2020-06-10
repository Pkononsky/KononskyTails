import {Request, Response} from "express";

import {Achievement} from "../models/Achievement";
import {Action} from "../models/Action";
import Database from "../database";
import {getDB} from "../routes";
import {PageData} from "../middlewares/pageData";

function getModelDataByParam<T, K>(db: Database, dbFunc: Function, params: K[] | undefined): Promise<T[]> {
    return Promise.all(params?.map((param) => dbFunc.bind(db)(param)) || []);
}

export async function showScene(req: Request, res: Response): Promise<void> {
    const db = getDB();
    const {meta, staticBasePath, title, logo} = req.locals;
    const {advName, sceneName} = req.params;

    const {firstScene} = await db.getAdventureByName(advName);
    const scene = await db.getSceneByName(sceneName);

    if (!scene)
        res.sendStatus(404);

    const actions = await getModelDataByParam<Action, string>(db, db.getActionByName, scene.actions);
    const achievements = await getModelDataByParam<Achievement, number>(db, db.getAchievementById, scene.achievements);

    const data: PageData = {
        meta,
        staticBasePath,
        title,
        logo,
        firstScene,
        scene,
        actions,
        currentAdventure: advName,
        achievements
    };

    res.json(data);
}

export async function startAdventure(req: Request, res: Response): Promise<void> {
    const db = getDB();
    const {advName} = req.params;

    const adventure = await db.getAdventureByName(advName);
    if (adventure) {
        res.redirect(`/api/startAdventure/${advName}/${adventure.firstScene}`);
    } else {
        res.sendStatus(404);
    }
}
