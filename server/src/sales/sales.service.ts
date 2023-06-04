import { Injectable, NotFoundException } from "@nestjs/common";
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
  async createSale(saleData: Partial<Sales>): Promise<Sales[]> {
    saleData.saleDate = new Date();
    const { productId, saleDate, quantity } = saleData;
    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const createdSale = await this.saleModel.create({
      productId,
      saleDate,
      quantity,
      price: product.price,
    });
    await createdSale.reload({ include: [this.productModel] });
    return [createdSale];
  }
  // ----------------------
  async getAllSales(): Promise<Sales[]> {
    return this.saleModel.findAll({ include: [this.productModel] });
  }

  // ----------------------
  async getAllSalesByPeriod(
    startDate: string,
    endDate: string
  ): Promise<Sales[] | string> {
    const soldProducts = await this.saleModel.findAll({
      where: {
        saleDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [this.productModel],
      raw: true,
    });
    if (soldProducts.length === 0) {
      return "no data for this period";
    }
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
      raw: true,
    });
    console.log(totalQuantity);
    return totalQuantity || "no data for this period";
  }
}
