import { Injectable } from "@nestjs/common";
import { Sales } from "./sales.model";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "src/products/product.model";

import { Op, Sequelize } from "sequelize";
@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales) private readonly saleModel: typeof Sales,
    @InjectModel(Product) private readonly productModel: typeof Product
  ) {}
  // ----------------------
  async createSale(saleData: Partial<Sales>) {
    saleData.saleDate = new Date();
    return this.saleModel.create(saleData);
  }
  // ----------------------
  async getAllSales(): Promise<Sales[]> {
    return this.saleModel.findAll({ include: [Product] });
  }

  // ----------------------
  async getAllSalesByPeriod(
    startDate: string,
    endDate: string
  ): Promise<Sales[]> {
    const soldProducts = await this.saleModel.findAll({
      where: {
        saleDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [Product],
    });
    return soldProducts;
  }
  // ----------------------
  async getTotalSalesAmount(
    startDate: string,
    endDate: string
  ): Promise<number | string> {
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
    return salesAmount || "no data for this period";
  }
  // ----------------------
  async getTotalSoldQuantity(
    startDate: string,
    endDate: string
  ): Promise<number | string> {
    const totalQuantity = await this.saleModel.sum("quantity", {
      where: {
        saleDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return totalQuantity || "no data for this period";
  }
}
