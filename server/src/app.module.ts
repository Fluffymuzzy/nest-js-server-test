import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { SequelizeConfigService } from "./config/sequelizeConfig.service";
import { databaseConfig } from "./config/configuration";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { SalesModule } from "./sales/sales.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { CallbacksModule } from "./callbacks/callbacks.module";
import { PriceListModule } from "./price-list/price-list.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AdminController } from "./admin/admin.controller";
import { UserController } from "./user/user.controller";
import { PriceListController } from "./price-list/price-list.controller";
import { StatisticsController } from "./statistics/statistics.controller";
import { ProductsController } from "./products/products.controller";
import { SalesController } from "./sales/sales.controller";
import { CallbacksController } from "./callbacks/callbacks.controller";

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    AdminModule,
    AuthModule,
    ProductsModule,
    StatisticsModule,
    SalesModule,
    CallbacksModule,
    PriceListModule,
    UserModule,
  ],
  controllers: [
    AppController,
    AdminController,
    UserController,
    StatisticsController,
    PriceListController,
    ProductsController,
    SalesController,
    CallbacksController,
  ],
  providers: [],
})
export class AppModule {}
