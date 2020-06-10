import {Column, Table, Model, DataType, PrimaryKey, ForeignKey} from 'sequelize-typescript';

import {Scene} from "./Scene";

@Table
export class Action extends Model<Action> {
    @PrimaryKey
    @Column(DataType.TEXT)
    action!: string;

    @ForeignKey(() => Scene)
    @Column(DataType.TEXT)
    nextScene!: string;

    @Column(DataType.TEXT)
    actionRu!: string;
}
