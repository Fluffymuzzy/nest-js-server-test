import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Delete,
  Get,
} from "@nestjs/common";
import { PriceListService } from "./price-list.service";
import { CreatePriceListDto } from "./dto/price-list.dto";
import { PriceList } from "./price-list.model";

@Controller("admin/price-list")
export class PriceListController {
  constructor(private priceListService: PriceListService) {}
  // ----------------------
  @Post()
  async createPriceService(
    @Body(new ValidationPipe()) priceListData: CreatePriceListDto
  ): Promise<PriceList> {
    return this.priceListService.createPriceService(priceListData);
  }
  // ----------------------
  @Put(":id")
  async updatePriceService(
    @Param("id") id: number,
    @Body() priceListData: Partial<PriceList>
  ): Promise<PriceList> {
    return this.priceListService.updatePriceService(id, priceListData);
  }
  // ----------------------
  @Delete(":id")
  async deletePriceService(@Param("id") id: number): Promise<void | string> {
    return this.priceListService.deletePriceService(id);
  }
  // ----------------------
  @Delete()
  async deleteAllPriceServices(): Promise<void | string> {
    return this.priceListService.deleteAllPriceServices();
  }
  // ----------------------
  @Get()
  async getPriceList(): Promise<PriceList[] | string> {
    return this.priceListService.getAllPriceService();
  }
}
