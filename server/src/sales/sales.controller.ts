import { Controller, Body, Post, Get } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/sales.dto";

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  // ----------------------
  @Post()
  async createSale(@Body() saleData: CreateSaleDto) {
    return this.salesService.createSale(saleData);
  }
  // ----------------------
  @Get()
  async getAllSales() {
    return this.salesService.getAllSales();
  }
  // ----------------------
}
