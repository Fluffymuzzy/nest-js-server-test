import { Injectable } from "@nestjs/common";
import { Sales } from "./sales.model";
import { InjectModel } from "@nestjs/sequelize";
// import { Product } from "src/products/product.model";

import { Op, Sequelize } from "sequelize";
@Injectable()
export class SalesService {
  constructor(@InjectModel(Sales) private readonly saleModel: typeof Sales) {}
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

  async getTotalSalesAmount(
    startDate: string,
    endDate: string
  ): Promise<number> {
    const totalSales = await this.saleModel.findOne({
      attributes: [
        [Sequelize.literal("SUM(price * quantity)"), "totalSalesAmount"],
      ],
      where: {
        saleDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const salesAmount = totalSales?.get("totalSalesAmount") as number;
    return salesAmount || 0;
  }
}
