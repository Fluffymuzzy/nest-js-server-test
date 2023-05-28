import { Controller, Get, Query } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get("sales")
  async calculateSalesStats(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    const statistics = await this.statisticsService.calculateSalesStats(
      new Date(startDate),
      new Date(endDate)
    );
    return statistics;
  }
}
