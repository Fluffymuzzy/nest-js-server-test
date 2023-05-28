import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sales } from "../sales/sales.model";
import { StatisticsController } from "./statistics.controller";
import { SalesService } from "src/sales/sales.service";
import { Product } from "src/products/product.model";

@Module({
  imports: [SequelizeModule.forFeature([Sales, Product])],
  controllers: [StatisticsController],
  providers: [StatisticsService, SalesService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
