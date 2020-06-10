import {Column, Table, Model, DataType, PrimaryKey} from 'sequelize-typescript';

@Table
export class Achievement extends Model<Achievement> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.TEXT)
    picture: string | undefined;

    @Column(DataType.TEXT)
    text!: string;
}
