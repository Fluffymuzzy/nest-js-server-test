import { Module } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "src/products/product.model";
import { SalesController } from "./sales.controller";
import { Sales } from "./sales.model";

@Module({
  imports: [SequelizeModule.forFeature([Sales, Product])],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [SalesService],
})
export class SalesModule {}
