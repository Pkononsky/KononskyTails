import {Column, Table, Model, DataType, PrimaryKey, ForeignKey} from 'sequelize-typescript';

import {Scene} from "./Scene";
import {HashTag} from "./HashTag";

@Table
export class Adventure extends Model<Adventure> {
    @PrimaryKey
    @Column(DataType.TEXT)
    adventureName!: string;

    @Column(DataType.TEXT)
    picture: string | undefined;

    @Column(DataType.TEXT)
    description: string | undefined;

    @ForeignKey(() => Scene)
    @Column(DataType.TEXT)
    firstScene: string | undefined;

    @ForeignKey(() => HashTag)
    @Column(DataType.ARRAY(DataType.INTEGER))
    hashTags: number[] | undefined;
}
