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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
