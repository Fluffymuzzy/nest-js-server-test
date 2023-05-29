import { Injectable } from "@nestjs/common";
import { SalesService } from "src/sales/sales.service";

@Injectable()
export class StatisticsService {
  constructor(private readonly salesService: SalesService) {}
  // ----------------------
  async getTotalSalesAmount(
    startDate: string,
    endDate: string
  ): Promise<number> {
    return this.salesService.getTotalSalesAmount(startDate, endDate);
  }
}
