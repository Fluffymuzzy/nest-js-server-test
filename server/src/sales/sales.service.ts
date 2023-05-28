import { Injectable } from "@nestjs/common";
import { Sales } from "./sales.model";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "src/products/product.model";

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales) private readonly saleModel: typeof Sales, // @InjectModel(Product) private readonly productModel: typeof Product
  ) {}
  // ----------------------
  async createSale(saleData: Partial<Sales>) {
    saleData.saleDate = new Date();
    return this.saleModel.create(saleData);
  }
  // ----------------------
  async getAllSales(): Promise<Sales[]> {
    return this.saleModel.findAll();
  }
  // ----------------------
  async getSalesByPeriod(startDate: Date, endDate: Date) {
    return this.saleModel.findAll({
      where: {
        saleDate: {
          $between: [startDate, endDate],
        },
      },
      include: [Product],
    });
  }
}
