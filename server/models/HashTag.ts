import {Column, Table, Model, DataType, PrimaryKey} from 'sequelize-typescript';

@Table
export class HashTag extends Model<HashTag> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.TEXT)
    valueRu!: string;

    @Column(DataType.TEXT)
    valueEn!: string;
}
