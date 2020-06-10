import {ModelType, Sequelize, SequelizeOptions} from 'sequelize-typescript'

import {Adventure} from "./models/Adventure";
import {Achievement} from "./models/Achievement";
import {Action} from "./models/Action";
import {HashTag} from "./models/HashTag";
import {Scene} from "./models/Scene";

import adventures from 'mocks/adventures.json'
import achievements from 'mocks/achievements.json'
import actions from 'mocks/actions.json'
import config from "config";
import hashTags from 'mocks/hashTags.json'
import scenes from 'mocks/scenes.json'

export default class Database {
    private readonly _sequelize: Sequelize;

    constructor() {
        const sequelizeOptions: SequelizeOptions = config.get('sequelizeOptions');

        this._sequelize = new Sequelize(sequelizeOptions);
        this._sequelize.addModels([Adventure, Scene, Action, HashTag, Achievement]);
    }

    public async init(): Promise<void> {
        this.initModel<HashTag>(HashTag, hashTags);
        this.initModel<Adventure>(Adventure, adventures);
        this.initModel<Scene>(Scene, scenes);
        this.initModel<Action>(Action, actions);
        this.initModel<Achievement>(Achievement, achievements);
    }

    private async initModel<T>(model: ModelType & (new () => T), modelData: object[]): Promise<void> {
        await model.drop();
        await model.sync({force: true});
        await model.bulkCreate(modelData);
    }

    private async getDataFromDB<T>(paramName: string, param: string | number, model: ModelType & (new () => T)): Promise<T> {
        return model.findOne({
            where: {
                [paramName]: param
            }
        }).then((r: any) => r ? r.dataValues : undefined);
    }

    public async getAdventureByName(adventureName: string): Promise<Adventure> {
        return this.getDataFromDB<Adventure>("adventureName", adventureName, Adventure);
    }

    public async getHashTagsById(hashTagId: number): Promise<HashTag> {
        return this.getDataFromDB<HashTag>("id", hashTagId, HashTag);
    }

    public async getSceneByName(sceneName: string): Promise<Scene> {
        return this.getDataFromDB<Scene>("sceneName", sceneName, Scene);
    }

    public async getActionByName(actionName: string): Promise<Action> {
        return this.getDataFromDB<Action>("action", actionName, Action);
    }

    public async getAchievementById(achievementId: number): Promise<Achievement> {
        return this.getDataFromDB<Achievement>("id", achievementId, Achievement);
    }

    public getAllAdventuresName(): Promise<string[]> {
        return Adventure.findAll().then((r) => r.map((adv) => adv.adventureName));
    }

    public getAllAdventuresNameByTag(tagName: string): Promise<string[]> {
        return HashTag.findOne({
            where: {
                valueEn: tagName
            }
        }).then(async (tag) => {
            const advNames: string[] = [];
            await Adventure.findAll().then((r) => r.forEach((adv) => {
                if (tag && adv && adv.hashTags && adv.hashTags.includes(tag.id)) {
                    advNames.push(adv.adventureName);
                }
            }));

            return advNames;
        });
    }

    public async getAllHashTagEN(): Promise<string[]> {
        return HashTag.findAll().then((r) => r.map((adv) => adv.valueEn));
    }


}
