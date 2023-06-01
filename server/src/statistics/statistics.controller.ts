import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { Sales } from "src/sales/sales.model";
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  // ----------------------
  @Get("sales")
  async getSalesStatistics(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<number> {
    return this.statisticsService.getSalesStatistics(startDate, endDate);
  }
  // ----------------------
  @Get("sales/details")
  async getSalesDetails(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<Sales[]> {
    return this.statisticsService.getSalesDetails(startDate, endDate);
  }
  // ----------------------
  @Get("sales/total-sales-amount")
  @HttpCode(200)
  async getTotalSalesAmount(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<number | string> {
    return this.statisticsService.getTotalSalesAmount(startDate, endDate);
  }
  // ----------------------
  @Get("sales/quantity")
  @HttpCode(200)
  async getTotalSoldQuantity(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<number | string> {
    return this.statisticsService.getTotalSoldQuantity(startDate, endDate);
  }
}
