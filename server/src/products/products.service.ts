import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    return this.productModel.create(productData);
  }


}
