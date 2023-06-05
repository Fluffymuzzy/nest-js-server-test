import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./admin.model";
import { ProductsModule } from "src/products/products.module";
import { Product } from "src/products/product.model";
import { StatisticsModule } from "src/statistics/statistics.module";
import { CallbacksModule } from "src/callbacks/callbacks.module";
import { Callback } from "src/callbacks/callback.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Product, Callback]),
    ProductsModule,
    StatisticsModule,
    CallbacksModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
