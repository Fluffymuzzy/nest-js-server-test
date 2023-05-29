import { Controller, Get, Query } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get("sales")
  async getTotalSalesAmount(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<number> {
    return this.statisticsService.getTotalSalesAmount(startDate, endDate);
  }
}
