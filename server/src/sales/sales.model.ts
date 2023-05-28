import {
  Column,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "src/products/product.model";

@Table
export class Sales extends Model<Sales> {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column
  saleDate: Date;

  @Column
  price: number;

  @Column
  quantity: number;
}
