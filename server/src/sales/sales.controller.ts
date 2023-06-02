import { Controller, Body, Post, Get } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { Sales } from "./sales.model";

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  // ----------------------
  @Post()
  async createSale(@Body() saleData: Partial<Sales>) {
    return this.salesService.createSale(saleData);
  }
  // ----------------------
  @Get()
  async getAllSales() {
    return this.salesService.getAllSales();
  }
  // ----------------------
}
