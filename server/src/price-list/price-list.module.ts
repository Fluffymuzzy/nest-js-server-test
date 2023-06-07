import { Module } from "@nestjs/common";
import { PriceListService } from "./price-list.service";
import { PriceListController } from "./price-list.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PriceList } from "./price-list.model";

@Module({
  imports: [SequelizeModule.forFeature([PriceList])],
  providers: [PriceListService],
  controllers: [PriceListController],
  exports: [PriceListService],
})
export class PriceListModule {}
