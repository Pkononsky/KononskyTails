import {Column, Table, Model, DataType, PrimaryKey, ForeignKey} from 'sequelize-typescript';

import {Action} from "./Action";
import {Achievement} from "./Achievement";

@Table
export class Scene extends Model<Scene> {
    @PrimaryKey
    @Column(DataType.TEXT)
    sceneName!: string;

    @Column(DataType.TEXT)
    picture: string | undefined;

    @Column(DataType.TEXT)
    description: string | undefined;

    @Column(DataType.TEXT)
    descriptionPos: string | undefined;

    @ForeignKey(() => Action)
    @Column(DataType.ARRAY(DataType.STRING))
    actions: string[] | undefined;

    @ForeignKey(() => Achievement)
    @Column(DataType.ARRAY(DataType.INTEGER))
    achievements: number[] | undefined;
}
