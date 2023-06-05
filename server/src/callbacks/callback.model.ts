import { Column, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Callback extends Model<Callback> {
  @Column
  name: string;

  @Column
  phoneNumber: string;

  @Column
  description: string;

  @Column
  processed: boolean;

  @Column
  archived: boolean;
}
