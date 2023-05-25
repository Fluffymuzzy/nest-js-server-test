import { Module } from "@nestjs/common";

import { AdminModule } from "./admin/admin.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { SequelizeConfigService } from "./config/sequelizeConfig.service";
import { databaseConfig } from "./config/configuration";
import { AuthModule } from './auth/auth.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
