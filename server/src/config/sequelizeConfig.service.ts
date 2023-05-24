import { Injectable } from "@nestjs/common";
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { Admin } from "src/admin/admin.model";

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      sql: { dialect, logging, host, port, database, username, password },
    } = this.configService.get("database");

    return {
      dialect,
      logging,
      host,
      port,
      database,
      username,
      password,
      models: [Admin],
      autoLoadModels: true,
      synchronize: true,
      define: {
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    };
  }
}
