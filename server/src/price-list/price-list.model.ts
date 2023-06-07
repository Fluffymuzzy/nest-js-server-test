import { Column, Model, Table } from "sequelize-typescript";

@Table
export class PriceList extends Model<PriceList> {
  @Column
  name: string;

  @Column
  price: number;
}
