import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Product extends Model<Product> {
  static getAll(): Product[] | PromiseLike<Product[]> {
      throw new Error("Method not implemented.");
  }
  @Column
  manufacturer: string;

  @Column
  name: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  article: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column
  type: string;

  @Column
  capacity: number;

  @Column
  heating_element_power: number;

  @Column
  heating_element_type: string;

  @Column
  material: string;

  @Column
  pipe_supply: string;

  @Column
  installation: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  bestsellers: boolean;
}
